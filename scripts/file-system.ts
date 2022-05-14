const fs = {};

/**
 * Open a handle to an existing file on the local file system.
 *
 * @return {!Promise<FileSystemFileHandle>} Handle to the existing file.
 */
fs.getFileHandle = async function (filePicker): Promise<FileSystemFileHandle> {
  // For Chrome 86 and later...
  if ("showOpenFilePicker" in window) {
    return window.showOpenFilePicker().then((handles) => handles[0]);
  }
  // For Chrome 85 and earlier...
  if ("chooseFileSystemEntries" in window) {
    return window.chooseFileSystemEntries();
  }
  return this.getFileLegacy(filePicker);
};

/**
 * Create a handle to a new (text) file on the local file system.
 *
 * @return {!Promise<FileSystemFileHandle>} Handle to the new file.
 */
fs.getNewFileHandle = function (): Promise<FileSystemFileHandle> {
  // For Chrome 86 and later...
  if ("showSaveFilePicker" in window) {
    const opts = {
      types: [
        {
          description: "Text file",
          accept: { "text/plain": [".txt"] },
        },
      ],
    };
    return window.showSaveFilePicker(opts);
  }
  // For Chrome 85 and earlier...
  const opts = {
    type: "save-file",
    accepts: [
      {
        description: "Text file",
        extensions: ["txt"],
        mimeTypes: ["text/plain"],
      },
    ],
  };
  return window.chooseFileSystemEntries(opts);
};

/**
 * Reads the raw text from a file.
 *
 * @param {File} file
 * @return {!Promise<string>} A promise that resolves to the parsed string.
 */
fs.readFile = function (file: File): Promise<string> {
  // If the new .text() reader is available, use it.
  if (file.text) {
    return file.text();
  }
  // Otherwise use the traditional file reading technique.
  return fs.readFileLegacy(file);
};

/**
 * Reads the raw text from a file.
 *
 * @private
 * @param {File} file
 * @return {Promise<string>} A promise that resolves to the parsed string.
 */
fs.readFileLegacy = function (file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", (e) => {
      const text = e.srcElement.result;
      resolve(text);
    });
    reader.readAsText(file);
  });
};

/**
 * Writes the contents to disk.
 *
 * @param {FileSystemFileHandle} fileHandle File handle to write to.
 * @param {string} contents Contents to write.
 */
fs.writeFile = async function (fileHandle: FileSystemFileHandle, contents: string) {
  // Support for Chrome 82 and earlier.
  if (fileHandle.createWriter) {
    // Create a writer (request permission if necessary).
    const writer = await fileHandle.createWriter();
    // Write the full length of the contents
    await writer.write(0, contents);
    // Close the file and write the contents to disk
    await writer.close();
    return;
  }
  // For Chrome 83 and later.
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Write the contents of the file to the stream.
  await writable.write(contents);
  // Close the file and write the contents to disk.
  await writable.close();
};

/**
 * Verify the user has granted permission to read or write to the file, if
 * permission hasn't been granted, request permission.
 *
 * @param {FileSystemFileHandle} fileHandle File handle to check.
 * @param {boolean} withWrite True if write permission should be checked.
 * @return {boolean} True if the user has granted read/write permission.
 */
fs.verifyPermission = async function (fileHandle: FileSystemFileHandle, withWrite: boolean): boolean {
  const opts = {};
  if (withWrite) {
    opts.writable = true;
    // For Chrome 86 and later...
    opts.mode = "readwrite";
  }
  // Check if we already have permission, if so, return true.
  if ((await fileHandle.queryPermission(opts)) === "granted") {
    return true;
  }
  // Request permission to the file, if the user grants permission, return true.
  if ((await fileHandle.requestPermission(opts)) === "granted") {
    return true;
  }
  // The user did nt grant permission, return false.
  return false;
};

/**
 * Uses the <input type="file"> to open a new file
 *
 * @return {!Promise<File>} File selected by the user.
 */
fs.getFileLegacy = (filePicker): Promise<File> => {
  return new Promise((resolve, reject) => {
    filePicker.onchange = (e) => {
      const file = filePicker.files[0];
      if (file) {
        resolve(file);
        return;
      }
      reject(new Error("AbortError"));
    };
  });
};

/**
 * Saves a file by creating a downloadable instance, and clicking on the
 * download link.
 *
 * @param {string} filename Filename to save the file as.
 * @param {string} contents Contents of the file to save.
 */
// function saveAsLegacy(filename, contents) {
fs.saveAsLegacy = (filename: string, contents: string) => {
  filename = filename || "Untitled.txt";
  const opts = { type: "text/plain" };
  const file = new File([contents], "", opts);
  aDownloadFile.href = window.URL.createObjectURL(file);
  aDownloadFile.setAttribute("download", filename);
  aDownloadFile.click();
};

export default fs;
