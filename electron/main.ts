import { app, BrowserWindow, globalShortcut, ipcMain, Tray, Menu, nativeImage, clipboard } from 'electron';
import { join, resolve } from 'path';
import { is } from '@electron-toolkit/utils';

let mainWindow: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;
let widgetWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 600,
    height: 400,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
    },
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    splashWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/splash.html`);
  } else {
    splashWindow.loadFile(join(__dirname, '../renderer/splash.html'));
  }
}

function createWidgetWindow() {
  widgetWindow = new BrowserWindow({
    width: 650,
    height: 450,
    show: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
    },
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    widgetWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/widget.html`);
  } else {
    widgetWindow.loadFile(join(__dirname, '../renderer/widget.html'));
  }

  widgetWindow.on('blur', () => {
    widgetWindow?.hide();
  });
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#09090b',
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
    },
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    if (splashWindow) {
      splashWindow.close();
      splashWindow = null;
    }
    mainWindow?.show();
  });
}

function createTray() {
  const icon = nativeImage.createEmpty(); // Replace with actual icon later
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: () => mainWindow?.show() },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() },
  ]);
  tray.setToolTip('Whisperflow Elite');
  tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
  createSplashWindow();
  createWidgetWindow();
  createTray();

  // Register Global Shortcut
  globalShortcut.register('Alt+Space', () => {
    if (widgetWindow?.isVisible()) {
      widgetWindow.hide();
    } else {
      widgetWindow?.show();
      widgetWindow?.focus();
    }
  });

  // Simulated Delay for Splash Screen
  setTimeout(createMainWindow, 3500);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handler for Clipboard
ipcMain.handle('read-clipboard', () => {
  return clipboard.readText();
});

ipcMain.on('write-clipboard', (_, text) => {
  clipboard.writeText(text);
});

ipcMain.on('close-widget', () => {
  widgetWindow?.hide();
});
