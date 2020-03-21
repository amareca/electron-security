const { app, BrowserWindow, ipcMain, shell } = require('electron')
const path = require("path");
const isDev = require("electron-is-dev");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    backgroundColor: '#2B2E3B',
    frame: false,
    width: 1024,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js'
    }
  });

  // and load the index.html of the app.
  win.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  // win.webContents.openDevTools();

  const invokeMap = new Map([
    ["invokeCloseWindow", () => win.close()],
    ["invokeMinimizeWindow", () => win.minimize()],
    ["invokeMaximizeWindow", () => win.isMaximized() ? win.unmaximize() : win.maximize()],
    ["invokeDevTools", () => win.webContents.openDevTools()],
    ["invokePruebas", () => {
      console.log('Has pulsado' + 'invokePruebas')
      console.log(shell.showItemInFolder(__dirname))
      // shell.beep()
    }],
    ["invokeLogin", (event, data) => {
      const { UserService } = require('./backend/services/user-service.js');

      let userService = new UserService();
      userService.exists(data).then((exists) => {
        if (exists) {
          //Existe, por tanto accede a la app
          event.returnValue = exists;
        } else {
          throw new Error('User doesn\'t exist');
        }
        // event.reply('replyLogin', exists);
      }).catch((e) => {
        //No se encuentra el usuario, se devuelve un error al usuario
        console.error(e.message);
        event.returnValue = false;
      });
    }],
    ["invokeCreateNewUser", (event, data) => {
      const { UserService } = require('./backend/services/user-service.js');

      //1. Se comprueba que existe el usuario

      //2. Si existe devolver error
      //Si no existe se crea el usuario, y se renderiza el componente ListAccounts

      let userService = new UserService();
      userService.exists(data).then((exists) => {
        if (exists) {
          //Existe, por tanto accede a la app
          event.returnValue = exists;
        } else {
          throw new Error('User doesn\'t exist');
        }
        // event.reply('replyLogin', exists);
      }).catch((e) => {
        //No se encuentra el usuario, se devuelve un error al usuario
        console.error(e.message);
        event.returnValue = false;
      });
    }],
  ]);

  invokeMap.forEach((v, k) => ipcMain.on(k, v));
  
  const { SQLiteDatabase } = require('./backend/manager.js');
  try {
    let db = new SQLiteDatabase();
    db.create();
    db.init();
  } catch (error) {
    console.log(error);
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
