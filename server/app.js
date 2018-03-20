const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()

const login = require('./routes/login');
const users = require('./routes/users');
const todos = require('./routes/todos');

const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todo', (err => {
  if(err) {
    console.log('failed to connect to database');
  } else {
    console.log('successfully connected to database');
  }
}));

// view engine setup

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');

app.use('/login', login);
app.use('/todos', todos);
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
