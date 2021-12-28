const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const debug = require("electron-debug");
const DB = require("./db");

debug();

app.on("ready", () => {
  let win;
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("index.html");

  DB.main();

  ipcMain.handle("db", async (event, ...args) => {
    console.log("args: ", args);
    const method = args[0];
    const data = args[1];
    const res = await DB[method](data);
    console.log("res: ", res);
    return res;
  });

  // setTimeout(() => {
  //   require("./dll/activate-window").showWeChat();
  // }, 3000);
});
