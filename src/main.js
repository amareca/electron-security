require('electron-reload')(__dirname);
require('module-alias/register');
const { app, BrowserWindow, ipcMain, Menu, Tray, shell } = require('electron');
const path = require('path');
const { SQLiteDatabase } = require('./db/manager.js');
//const { UserService } = require('@services/user-service.js');

app.on('ready', main)
//Funcion principal que se ejecuta nada mas lanzar la app
function main() {
  let win = new BrowserWindow({
    backgroundColor: '#F6F8F8',
    show: true,
    frame: false,
    width: 1024,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      preload: path.resolve(`${__dirname}/../src/engine/preload.js`)
      // preload: path.join(__dirname, '/engine/preload.js')
    }
  });
  win.loadFile(__dirname + '/index.html');

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
    ["invokeAccounts", (event, data) => {
      //Hay que crear un componente accounts-component y agregarlo al container del shadowRoot del view-component
      // win.webContents.executeJavaScript(`
      // const { AccountsComponent} = require('@app/view/accounts/accounts-component.js').AccountsComponent;
      // let accs = new AccountsComponent();
      // let view =  document.getElementsByTagName("view-component");
      // view.shadowRoot.appendChild(accs);
      // `);
      // let view =  document.getElementsByTagName("view-component");
      // view.shadowRoot.appendChild(accs);
    }],
  ]);

  invokeMap.forEach((v, k) => ipcMain.on(k, v));
  win.webContents.openDevTools();
  // try {
  //   let db = new SQLiteDatabase();
  //   db.create();
  //   db.init();
  // } catch (error) {
  //   console.log(error);
  // }
}


////////////////////////////////////////////////

  //ESTO CREA EL ICONO AL LADO DEL CALENDARIO DE WINDOWS
  // let tray = null
  // const iconPath = path.join(__dirname, 'resources/images/electron-security_200x200.png')
  // tray = new Tray(iconPath)
  // const contextMenu = Menu.buildFromTemplate([
  //   { label: 'Item1' },
  //   { label: 'Item2', type: 'separator' },
  //   { label: 'Item3', type: 'radio', checked: true },
  //   { label: 'Item4', type: 'radio' }
  // ])
  // tray.setToolTip('This is my application.')
  // tray.setContextMenu(contextMenu)
  ////////////////////////////////////////////////////////