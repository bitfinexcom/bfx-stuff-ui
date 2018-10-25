const Twit = require('twit')
const Sentiment = require('sentiment');

const uiLib = require('./../lib-ui.js')

const THRES_FOLLOWERS = 500

let MID = 0
const sentiment = new Sentiment()

function getTweetInfo (tweet, is_stream = false) {
  if (tweet.user.followers_count < THRES_FOLLOWERS * 10) {
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
    symbol: 'tBTCUSD',
    content: `<img src="${tweet.user.profile_image_url_https}" /><br />${tweet.text}`,
    color_bg: color_bg,
    color_text: '#FFFFFF',
    label: 'W',
    size_min: 15
  }
}

function run (wss, conf, keyword) {
  if (!keyword) {
    keyword = 'bitcoin'
  }

  const T = new Twit({
    consumer_key: conf.twitterKey,
    consumer_secret: conf.twitterSecret,
    access_token: conf.twitterAccessToken,
    access_token_secret: conf.twitterAccessSecret
  })

  uiLib.clearMarks(wss)

  T.get(
    'search/tweets',
    { q: keyword, result_type: 'popular', locale: 'en', count: 100 },
    (err, data, response) => {
      if (!data || !data.statuses) {
        return
      }

      data.statuses.forEach(tweet => {
        const data = getTweetInfo(tweet)

        if (!data) {
          return true
        }

        uiLib.addMark(
          wss, data 
        )

        return true
      })
    }
  )

  const stream = T.stream('statuses/filter', { track: [keyword] })

  stream.on('error', (err) => {
    console.error(err)
  })

  stream.on('tweet', tweet => {
    const data = getTweetInfo(tweet, true)
    if (!data) {
      return
    }

    uiLib.addMark(
      wss, getTweetInfo(tweet)
    )
  })
}

module.exports = {
  run: run
}
