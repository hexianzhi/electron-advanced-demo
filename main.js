const { app, BrowserWindow } = require("electron");
let win;
app.on("ready", () => {
  win = new BrowserWindow();
  win.loadFile("index.html");
  
  setTimeout(() => {
    console.log("唤起微信主窗口！");
    require("./dll/activate-window").showWeChat();
  }, 3000);
});
