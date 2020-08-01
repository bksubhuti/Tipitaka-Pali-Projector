const { app, BrowserWindow, globalShortcut  } = require('electron')
const electron = require("electron");
const { autoUpdater } = require('electron-updater');

// Setup the Auto Updater
//
autoUpdater.autoDownload = false;

let findInPage;

app.on('ready', () => {
    let mainWindow = new BrowserWindow({
        width: 1200,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(`file://${__dirname}/tipitaka_projector_data/index.htm`);

    mainWindow.on('focus', () => {
        globalShortcut.register('CommandOrControl+F', function () {
            if (mainWindow && mainWindow.webContents) {
                mainWindow.webContents.send('on-find', '')
            }
        });
    });
    mainWindow.on('blur', () => {
        globalShortcut.unregister('CommandOrControl+F')
    });
    mainWindow.on('closed', () => {
        mainWindow = null
    });

    /* Checking updates just after app launch and also notify for the same */
    mainWindow.webContents.on('dom-ready', () => {
        autoUpdater.checkForUpdates();
    });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
  globalShortcut.unregister('CommandOrControl+F')
})

autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart-and-update', () => {
    autoUpdater.quitAndInstall();
});
ipcMain.on('download-update', () => {
    autoUpdater.downloadUpdate();
});