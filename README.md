# bfx-stuff-ui

### CONFIGURE

* Setup the configuration file

```
cp config.json.example config.json
```

* Add your bitfinex `apiKey` and `apiSecret` (generate from https://www.bitfinex.com/api) 

* Configure your Twitter authentication keys `twitterKey`, `twitterSecret`, `twitterAccessToken`, `twitterAccessSecret`

* Configure your Telegram bot key `tgKey`


### RUN EXAMPLES

#### BASIC EXAMPLES

```
node bi.json notify_basic
```

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
