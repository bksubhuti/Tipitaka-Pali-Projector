const { app, BrowserWindow } = require('electron')
const electron = require("electron");
const updater = require("electron-updater");
const autoUpdater = updater.autoUpdater;

app.on('ready', () => {
    const mainWindow = new BrowserWindow({width: 1200, height: 720});
    mainWindow.loadURL(`file://${__dirname}/tipitaka_projector_data/index.htm`);
    /*Checking updates just after app launch and also notify for the same*/
});



autoUpdater.on('checking-for-update', function () {
    sendStatusToWindow('Checking for update...');
});

autoUpdater.on('update-available', function (info) {
    sendStatusToWindow('Update available.');
});

autoUpdater.on('update-not-available', function (info) {
    sendStatusToWindow('Update not available.');
});

autoUpdater.on('error', function (err) {
    sendStatusToWindow('Error in auto-updater.');
});

autoUpdater.on('download-progress', function (progressObj) {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + parseInt(progressObj.percent) + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
});

autoUpdater.on('update-downloaded', function (info) {
    sendStatusToWindow('Update downloaded; will install in 1 seconds');
});

autoUpdater.on('update-downloaded', function (info) {
    setTimeout(function () {
        autoUpdater.quitAndInstall();
    }, 1000);
});

function checkForUpdates(){
    const data = {
        'provider': 'github',
        'owner':    'bksubhuti',
        'repo':     'Tipitaka-Pali-Projector',
        'token':    '20e3a0ec85c4d2206044dd810c8f1b9228196900'
      };
    autoUpdater.setFeedURL(data);
    autoUpdater.checkForUpdates();
}

function sendStatusToWindow(message) {
    console.log(message);
}

module.exports = {
    checkForUpdates,
}