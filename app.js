var { app, BrowserWindow } = require("electron");

var instance;

var title = () => `mini tube`;

app.on("ready", function createWindow() {
  instance = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    title: title()
  });

  instance.setMenu(null);

  instance.loadURL(`file://${__dirname}/dist/index.html`);

  if (process.env.NODE_ENV === "development") {
    instance.webContents.openDevTools();
  }

  instance.on("closed", () => {
    instance = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (!mainWindow) {
    createWindow();
  }
});
