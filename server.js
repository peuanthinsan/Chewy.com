const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 8080);

if (process.env.NODE_ENV === 'production') {
  console.log("Running production from ./dist")
  app.use(express.static("./dist"));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "dist") + '/index.html')
  });
} else {
  process.env.NODE_ENV = 'development';
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
  const config = require('./webpack.config.js');
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
}

app.listen(app.get('port'));  