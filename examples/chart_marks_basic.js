const uiLib = require('./../lib-ui.js')

function run (wss) {
  let MID = 0

  uiLib.clearMarks(wss)

  const now = Date.now()

  for (let i = 0; i < 5; i++) {
    const mts = Math.round((now - (1000 * 10 * i * 60)) / 1000) * 1000

    uiLib.addMark(
      wss, {
        id: 'mark_' + MID++,
        ts: mts,
        symbol: 'tBTCUSD',
        content: `This is a simple mark.<br>It's shown only for <b>BTCUSD</b> pair.<br>If you zoom in it enough I'll see "W" label. It contains some simple HTML and a <a href="https://example.com">link</a>`,
        color_bg: `#${(i * 3) % 9}F${(i * 3) % 9}000`,
        color_text: '#FFFFFF',
        label: 'W',
        size_min: 15
      }
    )
  }
}

module.exports = {
  run: run
}
