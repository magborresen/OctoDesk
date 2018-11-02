const electron = require('electron')
const ipc = electron.ipcRenderer
const fs = require('fs')
const path = require('path')

var ipAddress
var apiKey

// Send a ready notifiction to main.js to retrieve IP Address and API key
document.addEventListener('DOMContentLoaded', function() {
  ipc.send('ready-notification')
})

// ****** Get IP and API ****** //

ipc.on('ip-notification', (event, arg) => {
  console.log(arg)
  ipAddress = arg
})

ipc.on('api-notification', (event, arg) => {
  console.log(arg)
  apiKey = arg
  startStream()
  callAPI(ipAddress, apiKey)
})


// ********** ********** //

// Pass the video stream link to source in video HTML tag

function startStream() {
  let url = 'http://' + ipAddress + '/webcam/?action=stream'
  var video = document.getElementById('video')

  video.setAttribute('src', url)

}

function callAPI(ipAddress, key) {
  // Call XML request
  var request = new XMLHttpRequest()
  // Register IP Address to access API
  request.open('GET', 'http://' + ipAddress + '/api/job', true)
  // Set the API Key as exclusive header to gain access
  request.setRequestHeader("X-Api-Key", key)

  // Wait until the request is loaded
  request.onload = function() {
    // Parse JSON data
    var data = JSON.parse(this.response)
    console.log(data)
    progress = document.getElementById('progress')
    timeLeft = document.getElementById('time-left')

    if (data['progress']['completion'] !== null) {
    progress.textContent += data['progress']['completion'].toLocaleString('en')
    timeLeft.textContent += data['job']['estimatedPrintTime'].toLocaleString('en')
  } else {
    progress.textContent += 'No ongoing job'
    timeLeft.textContent += 'No ongoing job'
  }

}

  request.send()
}
