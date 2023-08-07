"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var mongoose_1 = require("mongoose");
function exibir(input) {
    console.log("".concat(input));
}
var userSchema = new mongoose_1.default.Schema({
    username: String,
    email: String,
    password: String
});
var User = mongoose_1.default.model('User', userSchema);
var mainWindow;
function createWindow() {
    var iconPath = path.join(__dirname, '/img/Dongui.ico');
    var icon = electron_1.nativeImage.createFromPath(iconPath);
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        icon: icon,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.loadFile('../app/index.html');
}
electron_1.app.whenReady().then(function () {
    exibir("App sendo executado...");
    createWindow();
    electron_1.app.on('activate', function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
electron_1.app.on('window-all-closed', function () {
    exibir("App sendo fechado...");
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
//# sourceMappingURL=main.js.map