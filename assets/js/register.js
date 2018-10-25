const electron = require('electron')
const ipc = electron.ipcRenderer
const dialog = electron.dialog

const submitBtn = document.getElementById('apiSubmit')
var apiKey = document.getElementById('apiInput').value
var ipAddress = document.getElementByID('ipInput')

submitBtn.addEventListener('click', function (){
  if (apiKey.length == 32){
    ipc.send('submit-api-file', apiKey)
    ipc.send('submit-ip-adress', ipAddress)
  } else {
    dialog.showErrorBox('Wrong Input Value', "Your API key seems incorrect")
  }
})
