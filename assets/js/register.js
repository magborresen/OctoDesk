const electron = require('electron')
const ipc = electron.ipcRenderer
const dialog = electron.dialog

const submitBtn = document.getElementById('apiSubmit')

submitBtn.addEventListener('click', function (){

  let apiKey = document.getElementById('apiInput').value
  let ipAddress = document.getElementById('ipInput').value

  //if (apiKey.length == 32){
  console.log(apiKey)
  console.log(ipAddress)
  ipc.send('submit-api-file', apiKey)
  ipc.send('submit-ip-address', ipAddress)
  //} else {
    //dialog.showErrorBox('Wrong Input Value', "Your API key seems incorrect")
  //}
})
