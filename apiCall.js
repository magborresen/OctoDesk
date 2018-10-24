
function callAPI(ipAddress, key) {
  var request = new XMLHttpRequest()
  request.open('GET', 'http://' + ipAddress + '/api/job', true)
  request.setRequestHeader("X-Api-Key", key)

  request.onload = function() {
    var data = JSON.parse(this.response)
  }

  request.send()
}
