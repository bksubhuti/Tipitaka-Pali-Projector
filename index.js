const { app, BrowserWindow, globalShortcut, ipcMain, shell } = require('electron')
const electron = require("electron");
//const os = require("os");
const { autoUpdater } = require('electron-updater');

require('@electron/remote/main').initialize();

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
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    
    require('@electron/remote/main').enable(mainWindow.webContents);

    mainWindow.maximize();
    

    mainWindow.loadURL(`file://${__dirname}/tipitaka_projector_data/index.htm`);

    mainWindow.on('focus', () => {
        globalShortcut.register('CommandOrControl+F', function () {
            if (mainWindow && mainWindow.webContents) {
                mainWindow.webContents.send('on-find', '');
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
    //autoUpdater.checkForUpdates();
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

ipcMain.on('write-electron-blob', (event,data, fname) => {
    console.log (data);
    let fs = require("fs");
    const udpath= app.getPath("userData");
    const strPathFile = udpath + "/" + fname;
    console.log("about to write " + strPathFile);

    fs.writeFile(strPathFile, data, "utf-8", (error, data) => {
        if (error){
            console.error("error: " + error);
        }
    });

});

ipcMain.on('read-electron-blob', (event, fname) => {
    console.log ('got the read req with ' + fname);

    let fs = require("fs");
    const udpath= app.getPath("userData");
    const strPathFile = udpath + "/" + fname;
 
    var data = fs.readFileSync(strPathFile) + "";
    console.log("reading in ipcmain:  ");
        event.returnValue = data;
});


ipcMain.on('check-prefs-exist', (event, data) => {
    let fs = require("fs");

    const udpath= app.getPath("userData");

    const prefsFullName = udpath + "/" + "preferences.txt";
    // check for file exist
    console.log("checking to see if prefs exist*****");
    // if not exist.. read file and then send to ipcrend to write
        if (fs.existsSync(prefsFullName) == false) {
            console.log("creating file");
            fs.writeFile(prefsFullName, data, "utf-8", (error, data) => {
                if (error){
                    console.error("error: " + error);
                }
            });
        }

});



