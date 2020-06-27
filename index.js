const { app, BrowserWindow } = require('electron')

app.on('ready', () => {
    const mainWindow = new BrowserWindow({width: 1200, height: 720});
    mainWindow.loadURL(`file://${__dirname}/tipitaka_projector_data/index.htm`);
});