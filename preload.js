const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("toMain", {
  handleDB: async (method, ...args) => {
    const res = await ipcRenderer.invoke("db", method, args[0]);
    return res;
  },
});
