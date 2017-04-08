var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jsdom = require("jsdom");

var index = require('./routes/index');
var users = require('./routes/users');
var logs = require('./routes/logs');
var rides = require('./routes/rides');

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.Connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', index);
// app.use('/users', users);
app.use('/', users);
app.use('/logs', logs);
app.use('/rides', rides);


app.post('/checkLicensePlate/', function (req, res) {
  var license, licenseId;
  licenseId = req.body.licenseId;
  jsdom.env(
    "http://tablica-rejestracyjna.pl/"+licenseId,
    ["http://code.jquery.com/jquery.js"],
    function (err, window) {
      license = window.$("#cnt-1").text().trim();
      console.log("ilsoc kutasow", license );
      res.json(license);
    }
  );


}); 




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
