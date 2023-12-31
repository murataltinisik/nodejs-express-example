const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const newsRouter = require('./routes/news');
const usersRouter = require('./routes/users')

const app = express();

// DATABASE
const database = require('./database/database')();

// MIDDLEWARE
const config = require('./config')
app.set('api_secret_key', config.api_secret_key);
const verifyToken = require('./middleware/verify-token');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/api', verifyToken);
app.use('/api/news/', newsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render({ error: { message: err.message, code: err.code }});
});

module.exports = app;
