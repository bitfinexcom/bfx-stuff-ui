const request = require('request')
const uiLib = require('./../lib-ui.js')

function genPrice() {
  return Math.round((Math.random() * 500)) + 3500
}

function run (wss) {
  let MID = 0

  uiLib.clearShapes(wss)
  const cnt = 100

  let lastPrice = null

  for (let i = 0; i < cnt; i++) {
    if (!lastPrice) {
      lastPrice = genPrice()
    }

    const newPrice = genPrice()

    uiLib.addShape(
      wss, {
        points: [
          {
            ts: Date.now() - (1000 * 3600 * (cnt - i + 1)),
            price: lastPrice,
          },
          {
            ts: Date.now() - (1000 * 3600 * (cnt - i)),
            price: newPrice 
          }
        ],
        options: {
          shape: 'trend_line',
          overrides: {
            linecolor: '#00FF00',
          },
        }
      }
    )

    lastPrice = newPrice
  }
}

module.exports = {
  run: run
}
