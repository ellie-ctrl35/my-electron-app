const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  mainWindow.setMenu(null);

  if (isDev) {
    mainWindow.loadURL('http://localhost:3001'); // Load React app in development mode
  } else {
    mainWindow.loadFile(path.join(__dirname, 'build/index.html')); // Load React app in production mode
  }

  // Toggle DevTools based on environment
  if (isDev) {
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.webContents.closeDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
