import { app, BrowserWindow, ipcMain, IpcMainEvent, nativeImage } from 'electron';
import * as path from 'path';
import mongoose from 'mongoose';

function exibir(input: string): void {
  console.log(`${input}`);
}


const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);
let mainWindow: BrowserWindow;

function createWindow() {
  const iconPath = path.join(__dirname,'/img/Dongui.ico'); 
  const icon = nativeImage.createFromPath(iconPath);

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: icon, 
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('../app/index.html');
}

app.whenReady().then(() => {
  exibir("App sendo executado...");
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  exibir("App sendo fechado...");
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
