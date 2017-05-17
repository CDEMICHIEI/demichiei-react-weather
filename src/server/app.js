import 'babel-polyfill';
import express from 'express';
import path from 'path';

// import favicon from 'serve-favicon';
import React from 'react';
import ReactDOM from 'react-dom/server';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import env from './config/env';
import assets from './assets';
import Html from './Html';
import { HistoryGet, HistoryPost } from './controllers/HistoryController';
import { WeatherGet } from './controllers/WeatherController';

const app = express();

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/history', HistoryGet);
app.post('/history', HistoryPost);
app.get('/weather/:zip', WeatherGet);

app.get('*', async(req, res) => {
  const data = {
    title: 'React Weather App',
    description: 'Assessment demonstrating knowledge of React, REST API, Sequlize, etc.',
    style: '#app{height: 100%}',
    script: assets.main.js,
    children: '',
  };
  const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
  res.send(`<!doctype html>${html}`);
});

// catch 404 and forward to error handler
app.use = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use = (err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  };
}

// production error handler
// no stacktraces leaked to user
app.use = (err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
};

app.listen(env.port, () => {
  console.log(`The server is running at http://${env.host}:${env.port}/`);
});

module.exports = app;
