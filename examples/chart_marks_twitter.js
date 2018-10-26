const async = require('async')
const Twit = require('twit')
const Sentiment = require('sentiment')

const uiLib = require('./../lib-ui.js')

const THRES_RETWEETS = 25
let USERS = ['paoloardoino', 'bitfinex', 'iamnomad', 'flibbr', 'alistairmilne', 'ZeusZissou', 'adam3us', 'VitalikButerin', 'EOS_io', 'Tether_to', 'ethfinex', 'eosfinexproject', 'aantonop', 'coindesk', 'cointelegraph', 'loomdart']

let MID = 0
const sentiment = new Sentiment()

function getTweetInfo (tweet, is_stream = false) {
  if (!is_stream && tweet.retweet_count < THRES_RETWEETS) {
    return
  }

  const s = sentiment.analyze(tweet.text)

  let color_bg = '#0000FF'
  if (s.score > 0) {
    color_bg = `#00FF00`
  } else if (s.score < 0) {
    color_bg = `#FF0000`
  }

  return {
    id: 'mark_' + MID++,
    ts: (new Date(tweet.created_at)).getTime(),
    // symbol: 'tBTCUSD',
    content: `<img src="${tweet.user.profile_image_url_https}" /><br />${tweet.text}`,
    color_bg: color_bg,
    color_text: '#FFFFFF',
    label: 'W',
    size_min: 15
  }
}

function run (wss, conf, keyword) {
  if (keyword) {
    USERS = keyword.split(',')
  }

  const T = new Twit({
    consumer_key: conf.twitterKey,
    consumer_secret: conf.twitterSecret,
    access_token: conf.twitterAccessToken,
    access_token_secret: conf.twitterAccessSecret
  })

  uiLib.clearMarks(wss)

  async.eachSeries(USERS, (inf, next) => {
    T.get(
      'statuses/user_timeline',
      { screen_name: inf, count: 30 },
      (err, data, response) => {
        if (!data) {
          return next()
        }

        data.forEach(tweet => {
          const data = getTweetInfo(tweet)

          if (!data) {
            return true
          }

          uiLib.addMark(
            wss, data
          )

          return true
        })

        next()
      }
    )
  }, (err) => {
    if (err) {
      console.error('INIT', err)
    }
  })

  const stream = T.stream('statuses/filter', { track: USERS.map(x => `@${x}`) })

  stream.on('error', (err) => {
    console.error(err)
  })

  stream.on('tweet', tweet => {
    console.log(tweet)

    const data = getTweetInfo(tweet, true)
    if (!data) {
      return
    }

    uiLib.addMark(
      wss, data
    )

    uiLib.sendNotification(
      wss,
      tweet.user.profile_image_url_https,
      `https://twitter.com/${tweet.user.screen_name}/${tweet.id}`,
      tweet.text,
      {
        tone: 'pingUp'
      }
    )
  })
}

module.exports = {
  run: run
}
