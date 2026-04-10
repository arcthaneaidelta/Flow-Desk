"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
let mainWindow = null;
let splashWindow = null;
let widgetWindow = null;
let tray = null;
function createSplashWindow() {
  splashWindow = new electron.BrowserWindow({
    width: 600,
    height: 400,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.mjs"),
      sandbox: false
    }
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    splashWindow.loadURL(`${process.env["ELECTRON_RENDERER_URL"]}/splash.html`);
  } else {
    splashWindow.loadFile(path.join(__dirname, "../renderer/splash.html"));
  }
}
function createWidgetWindow() {
  widgetWindow = new electron.BrowserWindow({
    width: 650,
    height: 450,
    show: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.mjs"),
      sandbox: false
    }
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    widgetWindow.loadURL(`${process.env["ELECTRON_RENDERER_URL"]}/widget.html`);
  } else {
    widgetWindow.loadFile(path.join(__dirname, "../renderer/widget.html"));
  }
  widgetWindow.on("blur", () => {
    widgetWindow?.hide();
  });
}
function createMainWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    titleBarStyle: "hiddenInset",
    backgroundColor: "#09090b",
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.mjs"),
      sandbox: false
    }
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  mainWindow.once("ready-to-show", () => {
    if (splashWindow) {
      splashWindow.close();
      splashWindow = null;
    }
    mainWindow?.show();
  });
}
function createTray() {
  const icon = electron.nativeImage.createEmpty();
  tray = new electron.Tray(icon);
  const contextMenu = electron.Menu.buildFromTemplate([
    { label: "Show App", click: () => mainWindow?.show() },
    { type: "separator" },
    { label: "Quit", click: () => electron.app.quit() }
  ]);
  tray.setToolTip("Whisperflow Elite");
  tray.setContextMenu(contextMenu);
}
electron.app.whenReady().then(() => {
  createSplashWindow();
  createWidgetWindow();
  createTray();
  electron.globalShortcut.register("Alt+Space", () => {
    if (widgetWindow?.isVisible()) {
      widgetWindow.hide();
    } else {
      widgetWindow?.show();
      widgetWindow?.focus();
    }
  });
  setTimeout(createMainWindow, 3500);
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.ipcMain.handle("read-clipboard", () => {
  return electron.clipboard.readText();
});
electron.ipcMain.on("write-clipboard", (_, text) => {
  electron.clipboard.writeText(text);
});
electron.ipcMain.on("close-widget", () => {
  widgetWindow?.hide();
});
