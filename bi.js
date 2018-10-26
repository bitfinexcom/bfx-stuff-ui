const WebSocket = require('ws')
const crypto = require('crypto')
const fs = require('fs')

let conf

try {
  conf = JSON.parse(fs.readFileSync(`${__dirname}/config.json`, 'utf8'))
} catch (e) {
  console.error('config.json: file not found')
  process.exit(-1)
}

if (!process.argv[2]) {
  console.error('example not specified')
  process.exit(-1)
}

let script
try {
  script = require(`${__dirname}/examples/${process.argv[2]}.js`)
} catch (e) {
  console.error('script: not found')
  process.exit(-1)
}

if (!script.run) {
  console.error('script: run function not found')
  process.exit(-1)
}

const w1_apiKey = conf.apiKey
const w1_apiSecret = conf.apiSecret

const wss = new WebSocket('wss://api.bitfinex.com/ws/2')
const authNonce = (new Date()).getTime() * 1000
const payload = 'AUTH' + authNonce
const signature = crypto.createHmac('sha384', w1_apiSecret).update(payload).digest('hex')

wss.on('message', function (data) {
  data = JSON.parse(data)
  if (data.event) {
    if (data.event === 'auth' && data.status !== 'OK') {
      console.error('AUTHENTICATION FAILED')
      process.exit(-1)
    }
  }

  setInterval(() => {
    wss.send(JSON.stringify({ event: 'ping' }))
  }, 15000)
})

wss.on('open', function () {
  wss.send(JSON.stringify({
    event: 'auth',
    apiKey: w1_apiKey,
    authSig: signature,
    authPayload: payload,
    authNonce: +authNonce
  }))

  setTimeout(() => {
    script.run(wss, conf, process.argv[3])
  }, 2000)
})

wss.on('close', function () {
  console.error('SOCKET CLOSED')
  process.exit(-1)
})
