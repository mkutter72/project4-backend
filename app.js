'use strict';

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var uuid = require('uuid');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('./models/index');

process.env.SESSION_SECRET || require('dotenv').load();
// require passport
// require passport config file
var cors = require('cors');
var passport = require('./lib/passport');

var routes = require('./routes/index');
var users = require('./routes/users');
var mboard = require('./routes/mboard');
var appointment = require('./routes/appointment');
var wallpost = require('./routes/wallpost')

var app = express();

app.use(cors({
 origin: ['http://localhost:5000', 'http://mkutter72.github.io'],
 credentials: true
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret : process.env.SESSION_SECRET,
	resave : false,
	saveUninitialized : false,
	store : new MongoStore({
		mongooseConnection : mongoose.connection
	}),
	cookie : {
		maxAge : 300000 // 5 minutes
	},
	genid : function() {
		return uuid.v4({
			rng : uuid.nodeRNG
		});
	}
}));

// mount return value of `passport.initialize` invocation on `app`
app.use(passport.initialize());

// mount return value of `passport.session` invocation on `app`
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/mboard', mboard);
app.use('/appointment', appointment);
app.use('/wallpost',wallpost);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err.stack
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
