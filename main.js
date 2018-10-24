const electron = require('electron')
const {app, BrowserWindow, ipcMain, Tray, nativeImage, Menu} = require('electron')
const path = require('path')
const fs = require('fs')

const assetsDir = path.join(__dirname, 'assets')

let tray = null
let window = null
const ipAddress = "192.168.87.197"

const TRAY_ARROW_HEIGHT = 50;
const WINDOW_WIDTH = 500;
const WINDOW_HEIGHT = 380;
const HORIZ_PADDING = 15;
const VERT_PADDING = 15;

app.on('ready', () => {

  if (process.platform == 'darwin') {
  app.dock.hide()
  }
  // Get's the icon from the path
  let icon = nativeImage.createFromDataURL(base64Icon)
  // Starts a new tray based on the icon
  tray = new Tray(icon)

  // When the tray icon is clicked the window will show
  tray.on('click', function(event) {
    toggleWindow()
  })

  // Defining the new browser window with parameters
  window = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    show: false,
    frame: false,
    resizable: false,
    movable: false,
  })

  // Sets the text that's showed when mouse is hovered over the tray icon
  tray.setToolTip('Toggle OctoDesk')

})

// Hides the window if visible and vice versa
function toggleWindow() {
  if (window.isVisible()) {
    window.hide()
  }
  else {
    // Check if API file exists.
    if (fs.existsSync(path.join(__dirname, 'Token.txt'))) {
      createWindow()
      showAppWindow()
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

function showAppWindow() {
  // Load the webcam url from OctoPrint
  window.loadURL('http://' + ipAddress + '/webcam/?action=stream')
}

function showRegisterWindow() {
  // Load the register template
  window.loadURL(path.join(__dirname, 'assets/html/register.html'))
}

let base64Icon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw
7AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AkZCg87wZW7ewA
AAp1JREFUOMuV1U2IVlUcx/HPnbc0MWwEF40hRWRQmWhEUi4KorlTQ0zQKgqSxKinRYuWrdq0iIp8DAy
CFmYUUVTYY0Qw0SsYVDQRlFlQU4o4VDMUY9NzWtz/45znzo3yv7n/l3O+53fOPS+F/7R9G0l34Vlap/x
PG+gPby76471jpJdxI4p/x5QrakPVZ3yI4lLSLH4LpetIT5N24AWKpZXAW4boXogFnGxQXEzhdQYHl0v
pbtJkBIOkBqXpVhzAWIPi8hocxCyH5qp0e10oHY6BNy3P7szULyc9hzkGTjat8WPRqctkD3QORrJ211J
srPV7CKP4i7S6CXxF+GtY2lG5D5yg+D6bckHaRXs463dV+OtJVzeBj4Q/inuy2uf4NYPvyVR38Vn4GzD
ZAC5ezHbITsqtEU8HvGcjpFblDncpDma16yhvqit+c3mLuQj3Vm7rJ4r3kW+z+6sD80aKQWcivwm318B
pHk9mA11PuSXil/B1thyrSA9HMI8nMtYNlDszcKdbHVcLkduCO0L1VxTv1VTv5plR3lrCuzga+c2YqB2
QNEfqjV7EWl8c8X78kKleTTfWeuA49maDjlNuz8CHFykOYDEabKvg0Jqh+AB/Z4D7qs+h03gbxyK/FVf
WL6FfsC/8tdGoZ0/hRKZ6A+2pUP1jdZecse01cGcBr2YNzqdcG6q/oDgS+7e3XLeF6j/wTvzM6Lfi2nQ
KP8e0P6Ezn9X2488MvLnW75vwP2wCr8J5eD4upsxaHZzOwNNZcU2c3FfwWg1cDuISfIxH6fzedE8G90s
8nuXH8B0eoXNc/6tQjsQfXaQz0/BEXUD3W4oF0hQPflTlJwZIl+FcOp86e2vvoj1Le6I/P974ZA2dBXk
97qQ13Z8+3PS0+AdjKa1R95YOZgAAAABJRU5ErkJggg==`
