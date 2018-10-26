# bfx-stuff-ui

## CONFIGURE

1. Setup the configuration file.

```
cp config.json.example config.json
```

2. Add your Bitfinex `apiKey` and `apiSecret` (you can generate those from https://www.bitfinex.com/api).

3. If you want to run Twitter examples, configure your Twitter authentication keys `twitterKey`, `twitterSecret`, `twitterAccessToken`, `twitterAccessSecret`.

* If you want to run Telegram examples, configure your Telegram bot key `tgKey`.


## RUN EXAMPLES

#### BASIC EXAMPLES

* Shows a simple notification in your Bitfinex UI.
```
node bi.js notify_basic
```

![Basic Notification](/images/notification-1.png)

* Adds 5 chart markers in your Bitfinex UI chart
Note: make sure to use the 5m (or 15m) timeframe and zoom towards current time

```
node bi.js chart_marks_basic
```


#### TWITTER SENTIMENT ANALISYS AND CHART MARKERS

Subscribes to a list of Twitter influencers, performs basic sentiment analysis and adds the relative markers to the Bitfinex UI chart.
```
node bi.js chart_marks_twitter
```

![Basic Notification](/images/chart-2.png)


#### TELEGRAM BOT AND CHART MARKERS 

Registers a Telegram Bot command: `notify`
Once running you'll be able to interact with the bot sending `/notify fooooooo` message and you'll see `fooooooo` appearing as notification in Bitfinex UI.

```
node bi.js notify_telegram
```
