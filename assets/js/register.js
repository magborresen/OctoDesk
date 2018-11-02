const electron = require('electron')
const ipc = electron.ipcRenderer
const {dialog} = require('electron').remote
const fs = require('fs')

const submitBtn = document.getElementById('apiSubmit')


submitBtn.addEventListener('click', function (err){

  let apiKey = document.getElementById('apiInput').value
  let ipAddress = document.getElementById('ipInput').value

  //if (apiKey.length == 32){
  console.log(apiKey)
  console.log(ipAddress)
  let userInfo = {APIKey: apiKey, IPAddress: ipAddress}
  let userInfoJSON = JSON.stringify(userInfo)

  fs.writeFile('user-info.json', userInfoJSON, 'utf8', function(err) {
    if (err) throw err;
      console.log('File Saved')
    })
  //} else {
    //dialog.showErrorBox('Wrong Input Value', "Your API key seems incorrect")
  //}
  })
