const electron = require('electron')
const {app, BrowserWindow, ipcMain, Tray, nativeImage, Menu, remote} = require('electron')
const path = require('path')
const fs = require('fs')

const assetsDir = path.join(__dirname, 'assets')

let tray = null
let window = null
let appIcon = path.join(__dirname, 'assets/img/octoprint.png')

const TRAY_ARROW_HEIGHT = 50;
const WINDOW_WIDTH = 500;
const WINDOW_HEIGHT = 380;
const HORIZ_PADDING = 15;
const VERT_PADDING = 15;

app.on('ready', () => {

  if (process.platform == 'darwin') {
  app.dock.hide()
  }
  // Starts a new tray based on the icon
  tray = new Tray(appIcon)

  // When the tray icon is clicked the window will show
  tray.on('click', function(event) {
    toggleWindow()
  })

  // ******** Window ********//
  // Defining the new browser window with parameters
  window = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    show: false,
    frame: false,
    resizable: false,
    movable: false,
    skipTaskbar: true,
  })
  // ********* ********* //

  window.webContents.openDevTools()

  // Sets the text that's showed when mouse is hovered over the tray icon
  tray.setToolTip('Toggle OctoDesk')

  //******** Menu ********//
  var menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        {
          label: 'Toggle dev tools',
          click() {
            window.webContents.openDevTools()
          }
        },
        {
          label: 'Quit',
          click() {
            app.quit()
          }
        },
      ]
    }
  ])

  if (process.platform !== 'darwin'){
  tray.setContextMenu(menu)
  }

  // ******** ******** //

})

// Hides the window if visible and vice versa
function toggleWindow() {
  var ipAddress
  var apiKey
  if (window.isVisible()) {
    window.hide()
  }
  else {
    // Check if API file exists.
    if (fs.existsSync(path.join(__dirname, 'user-info.json'))) {
      // Read JSON file to get API Key and IP Address
      fs.readFile('user-info.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
          console.log(err)
        } else {
          var obj_data = JSON.parse(data)
          ipAddress = obj_data["IPAddress"]
          apiKey = obj_data["APIKey"]
          createWindow()
          showAppWindow(ipAddress, apiKey)
        }
      })
    }
    // If not. Open register Window
    else {
      createWindow()
      showRegisterWindow()
    }
  }
}

// Restraining the window
function createWindow() {
   var screen = electron.screen
   const cursorPosition = screen.getCursorScreenPoint()
   const primarySize = screen.getPrimaryDisplay().workAreaSize
   const trayPositionVert = cursorPosition.y >= primarySize.height/2 ? 'bottom' : 'top'
   const trayPositionHoriz = cursorPosition.x >= primarySize.width/2 ? 'right' : 'left'
   window.setPosition(getTrayPosX(),  getTrayPosY())
   window.isVisible() ? window.hide() : window.show()

   function getTrayPosX() {
     const horizBounds = {
       left:   cursorPosition.x - WINDOW_WIDTH/2,
       right:  cursorPosition.x + WINDOW_WIDTH/2
     }
     if (trayPositionHoriz == 'left') {
       return horizBounds.left <= HORIZ_PADDING ? HORIZ_PADDING : horizBounds.left
     }
     else {
       return horizBounds.right >= primarySize.width ? primarySize.width - HORIZ_PADDING - WINDOW_WIDTH: horizBounds.right - WINDOW_WIDTH
     }
   }
   function getTrayPosY() {
     return trayPositionVert == 'bottom' ? cursorPosition.y - WINDOW_HEIGHT - VERT_PADDING : cursorPosition.y + VERT_PADDING
   }
}

function showAppWindow(ip, api) {
  // Load the webcam url from OctoPrint
  window.loadURL(`file://${path.join(__dirname, 'assets/html/index.html')}`)

  // Use ipc to send the IP Address and API key to index.js
  ipcMain.on('ready-notification', (event, arg) => {
    event.sender.send('ip-notification', ip)
  })
  ipcMain.on('ready-notification', (event, arg) => {
    event.sender.send('api-notification', api)
  })
}

function showRegisterWindow() {
  // Load the register template
  window.loadURL(`file://${path.join(__dirname, 'assets/html/register.html')}`)
}

// **********Ipc's********* //

// ********* ********* //
