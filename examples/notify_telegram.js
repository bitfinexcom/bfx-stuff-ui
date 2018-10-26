const Telegraf = require('telegraf')
const uiLib = require('./../lib-ui.js')

function run(wss, conf) {

  const bot = new Telegraf(conf.tgKey)

  bot.start((ctx) => {
  
  })

  bot.help((ctx) => ctx.reply("notify lorem ipsum... : sends a notification to your bitfinex UI"))

  bot.command('notify', (ctx) => {
    if (ctx.update && ctx.update.message) {
      const msg = ctx.update.message
      const text = msg.text.replace('/notify ', '')

      uiLib.sendNotification(
        wss,
        null, null,
        `TG(from=${msg.chat.username}>${msg.from.username}): ${text}`,
        {
          tone: 'pingUp',
        } 
      )

      console.log(msg, text)
    }
  })

  bot.startPolling()  
}

module.exports = {
  run: run
}
