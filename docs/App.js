const app = {
  appName: "cradova-docs",
  hasFSAccess:
    "chooseFileSystemEntries" in window || "showOpenFilePicker" in window,
  isMac: navigator.userAgent.includes("Mac OS X"),
  isAndroid: navigator.userAgent.includes("Android"),
  isWindows: navigator.userAgent.includes("Windows"),
};

/**
 * Track successful app installs
 */
window.addEventListener("appinstalled", (e) => {
  //
  console.log("app installed!");
});

/**
 * Listen for 'beforeinstallprompt' event, and update the UI to indicate
 * text-editor can be installed.
 */
window.addEventListener("beforeinstallprompt", (e) => {
  // Don't show the mini-info bar
  e.preventDefault();

  // Save the deferred prompt
  app.installPrompt = e;

  // Show the install button
  butInstall.removeAttribute("disabled");
  butInstall.classList.remove("hide");
});

window.addEventListener("appinstalled", () => {
  // Hide the app-provided install promotion
  // FIXME: hideInstallPromotion();
  // Clear the deferredPrompt so it can be garbage collected
  app.installPrompt = null;
  // Optionally, send analytics event to indicate successful install
  console.log("PWA was installed");
});

const butInstall = document.getElementById("butInstall");
// Handle the install button click
butInstall.addEventListener("click", () => {
  butInstall.setAttribute("disabled", true);
  app.installPrompt.prompt();
});

app.getPWADisplayMode = function () {
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  if (document.referrer.startsWith("android-app://")) {
    return "twa";
  } else if (navigator.standalone || isStandalone) {
    return "standalone";
  }
  return "browser";
};
