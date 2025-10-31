const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // kalau kamu punya index.html di project-mu
  win.loadFile(path.join(__dirname, "index.html"));

  // kalau mau load website online:
  // win.loadURL("http://127.0.0.1:5500/index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
