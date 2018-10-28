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
  let userInfo = {APIKey: apiKey, IPAddress: ipAddress}
  let userInfoJSON = JSON.stringify(userInfo)

  fs.writeFile('user-info.json', userInfoJSON, 'utf8', function(err) {
    if (err) {
      return console.log(err)
    } else {
      console.log('File Saved')
  //} else {
    //dialog.showErrorBox('Wrong Input Value', "Your API key seems incorrect")
  //}
})
