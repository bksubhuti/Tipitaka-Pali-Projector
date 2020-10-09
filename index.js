const { app, BrowserWindow, globalShortcut, ipcMain, shell } = require('electron')
const electron = require("electron");
//const os = require("os");
const { autoUpdater } = require('electron-updater');

// Setup the Auto Updater
//
autoUpdater.autoDownload = false;

let findInPage;
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        }
    });

    if(process.platform == 'darwin'){
        mainWindow.setFullScreen(true);
    }
    else{
        mainWindow.maximize();
    }
    

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
        
    });
});

app.on('window-all-closed', () => {
  app.quit()
  globalShortcut.unregister('CommandOrControl+F')
})

autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('check-for-update', () => {
    autoUpdater.checkForUpdates();
});
ipcMain.on('restart-and-update', () => {
    autoUpdater.quitAndInstall();
});
ipcMain.on('download-update', () => {
    if (process.platform.toLowerCase().indexOf('win') === 0) {
        autoUpdater.downloadUpdate();
    } else {
        shell.openExternal('https://github.com/bksubhuti/Tipitaka-Pali-Projector/releases/latest');
    }
});

