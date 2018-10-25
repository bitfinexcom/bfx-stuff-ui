const uiLib = require('./../lib-ui.js')

function run(wss) {
  uiLib.sendNotification(
    wss, 
    'https://www.bitfinex.com/assets/bfx-stacked.png',
    'http://www.bitfinex.com',
    'This is a test notification',
    {
      tone: 'pingUp',
    } 
  )
}

module.exports = {
  run: run
}
