# Wikipedia Leaderboard

See the top visited pages on Wikipedia on any given day!

[Their API](https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageviews#Most_viewed_articles)
is free and accessible (not very surprising considering it is the Wikimedia foundation...)
although it's not very well documented.
Nevertheless, you can use it to make cool stuff.


## Development and Production

webpack-dev-server is not a very efficient thing to run in "production" on a server that goes to sleep after five minutes of inactivity,
therefore this project also has a "production" mode, where [local-web-server]() is used to serve the
html file and transpiled `main.js` file.

**Development** requires changing the `start` script in `package.json` to `webpack-dev-server` and changing the `mode` variable in `webpack.config.js`

**Production** requires changing the `start` script in `package.json` to `ws --directory ./dist`, changing `mode` in `webpack.config.js` and running `npm run build`.
