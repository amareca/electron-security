// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname);

const { app, BrowserWindow, ipcMain , Menu, Tray, shell} = require('electron')
// const sqlite3 = require('sqlite3').verbose();
const path = require('path')
// const dataBase = './db/storage.db'

const defaultProps = {
    backgroundColor : '#F6F8F8',
    show: true,
    frame: false,
    width: 1024,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, '/engine/preload.js')
    }
}
  
class AppWindow extends BrowserWindow {
    constructor (){
        super({...defaultProps})
        this.loadFile(__dirname + '/index.html')
    }
}
//Funcion principal que se ejecuta nada mas lanzar la app
function main () {
  let win = new AppWindow()


  //ESTO CREA EL ICONO AL LADO DEL CALENDARIO DE WINDOWS
  let tray = null
  const iconPath = path.join(__dirname, 'resources/images/electron-security_200x200.png')
  tray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1'  },
    { label: 'Item2', type: 'separator' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  ////////////////////////////////////////////////////////

  ipcMain.on('invokeAction', function(event, data){
    //var result = processData(data);
    win.close();
    //event.sender.send('actionReply', result);
  });
  ipcMain.on('invokeMinimizeWindow', function(event, data){
    win.minimize();
  });
  ipcMain.on('invokeMaximizeWindow', function(event, data){
    win.isMaximized() ? win.unmaximize() : win.maximize();
  });
  ipcMain.on('invokeDevTools', function(event, data){
    //var result = processData(data);
    win.webContents.openDevTools();
    //event.sender.send('actionReply', result);
  });
  ipcMain.on('invokePruebas', function(event, data){
    console.log('Has pulsado' + 'invokePruebas')
    console.log(shell.showItemInFolder(__dirname))
    // shell.beep()
  });
  
  // try {
  //   createDataBase()
  //   createTableUsers()
  // } catch (error) {
  //   console.log(error)
  // }

  let SQLiteDatabase = require('./db/manager.js').SQLiteDatabase

  try {
    let db = new SQLiteDatabase()
    db.buildNew()
    db.createTableUsers()
    // db.addUser()
  } catch (error) {
    console.log(error)
  }
}

app.on('ready', main)
