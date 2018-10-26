# bfx-stuff-ui

### CONFIGURE

1. Setup the configuration file.

```
cp config.json.example config.json
```

2. Add your Bitfinex `apiKey` and `apiSecret` (you can generate those from https://www.bitfinex.com/api).

3. If you want to run Twitter examples, configure your Twitter authentication keys `twitterKey`, `twitterSecret`, `twitterAccessToken`, `twitterAccessSecret`.

* If you want to run Telegram examples, configure your Telegram bot key `tgKey`.


### RUN EXAMPLES

#### BASIC EXAMPLES

* Shows a simple notification in your Bitfinex UI.
```
node bi.json notify_basic
```

* Shows a 5 chart markers in your Bitfinex UI chart
Note: make sure to use the 5m (or 15m) timeframe and zoom towards current time

```
node bi.json chart_marks_basic
```


#### TWITTER SENTIMENT ANALYSISYS AND CHART MARKERS

```
node bi.json chart_marks_twitter
```

#### TELEGRAM BOT AND CHART MARKERS 

```
node bi.json notify_telegram
```
