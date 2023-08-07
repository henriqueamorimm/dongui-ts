const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendUserData: (data) => ipcRenderer.send('user-data', data)
});
