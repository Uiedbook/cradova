var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var fs = {};
    /**
     * Open a handle to an existing file on the local file system.
     *
     * @return {!Promise<FileSystemFileHandle>} Handle to the existing file.
     */
    fs.getFileHandle = function (filePicker) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // For Chrome 86 and later...
                if ("showOpenFilePicker" in window) {
                    return [2 /*return*/, window.showOpenFilePicker().then(function (handles) { return handles[0]; })];
                }
                // For Chrome 85 and earlier...
                if ("chooseFileSystemEntries" in window) {
                    return [2 /*return*/, window.chooseFileSystemEntries()];
                }
                return [2 /*return*/, this.getFileLegacy(filePicker)];
            });
        });
    };
    /**
     * Create a handle to a new (text) file on the local file system.
     *
     * @return {!Promise<FileSystemFileHandle>} Handle to the new file.
     */
    fs.getNewFileHandle = function () {
        // For Chrome 86 and later...
        if ("showSaveFilePicker" in window) {
            var opts_1 = {
                types: [
                    {
                        description: "Text file",
                        accept: { "text/plain": [".txt"] }
                    },
                ]
            };
            return window.showSaveFilePicker(opts_1);
        }
        // For Chrome 85 and earlier...
        var opts = {
            type: "save-file",
            accepts: [
                {
                    description: "Text file",
                    extensions: ["txt"],
                    mimeTypes: ["text/plain"]
                },
            ]
        };
        return window.chooseFileSystemEntries(opts);
    };
    /**
     * Reads the raw text from a file.
     *
     * @param {File} file
     * @return {!Promise<string>} A promise that resolves to the parsed string.
     */
    fs.readFile = function (file) {
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
    fs.readFileLegacy = function (file) {
        return new Promise(function (resolve) {
            var reader = new FileReader();
            reader.addEventListener("loadend", function (e) {
                var text = e.srcElement.result;
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
    fs.writeFile = function (fileHandle, contents) {
        return __awaiter(this, void 0, void 0, function () {
            var writer, writable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fileHandle.createWriter) return [3 /*break*/, 4];
                        return [4 /*yield*/, fileHandle.createWriter()];
                    case 1:
                        writer = _a.sent();
                        // Write the full length of the contents
                        return [4 /*yield*/, writer.write(0, contents)];
                    case 2:
                        // Write the full length of the contents
                        _a.sent();
                        // Close the file and write the contents to disk
                        return [4 /*yield*/, writer.close()];
                    case 3:
                        // Close the file and write the contents to disk
                        _a.sent();
                        return [2 /*return*/];
                    case 4: return [4 /*yield*/, fileHandle.createWritable()];
                    case 5:
                        writable = _a.sent();
                        // Write the contents of the file to the stream.
                        return [4 /*yield*/, writable.write(contents)];
                    case 6:
                        // Write the contents of the file to the stream.
                        _a.sent();
                        // Close the file and write the contents to disk.
                        return [4 /*yield*/, writable.close()];
                    case 7:
                        // Close the file and write the contents to disk.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Verify the user has granted permission to read or write to the file, if
     * permission hasn't been granted, request permission.
     *
     * @param {FileSystemFileHandle} fileHandle File handle to check.
     * @param {boolean} withWrite True if write permission should be checked.
     * @return {boolean} True if the user has granted read/write permission.
     */
    fs.verifyPermission = function (fileHandle, withWrite) {
        return __awaiter(this, void 0, void 0, function () {
            var opts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        opts = {};
                        if (withWrite) {
                            opts.writable = true;
                            // For Chrome 86 and later...
                            opts.mode = "readwrite";
                        }
                        return [4 /*yield*/, fileHandle.queryPermission(opts)];
                    case 1:
                        // Check if we already have permission, if so, return true.
                        if ((_a.sent()) === "granted") {
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, fileHandle.requestPermission(opts)];
                    case 2:
                        // Request permission to the file, if the user grants permission, return true.
                        if ((_a.sent()) === "granted") {
                            return [2 /*return*/, true];
                        }
                        // The user did nt grant permission, return false.
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Uses the <input type="file"> to open a new file
     *
     * @return {!Promise<File>} File selected by the user.
     */
    fs.getFileLegacy = function (filePicker) {
        return new Promise(function (resolve, reject) {
            filePicker.onchange = function (e) {
                var file = filePicker.files[0];
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
    fs.saveAsLegacy = function (filename, contents) {
        filename = filename || "Untitled.txt";
        var opts = { type: "text/plain" };
        var file = new File([contents], "", opts);
        aDownloadFile.href = window.URL.createObjectURL(file);
        aDownloadFile.setAttribute("download", filename);
        aDownloadFile.click();
    };
    exports["default"] = fs;
});
//# sourceMappingURL=file-system.js.map