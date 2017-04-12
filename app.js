var express = require('express');
var path = require('path');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var app = express();


var routes = require('./routes/router');

// view engine setup
app.set('views', path.join(__dirname, 'views'));


var hbs=exphbs.create({
  defaultLayout: 'main',
  extname: '.html'
})

app.engine('.html', hbs.engine);
app.set('view engine', '.html');


// uncomment after placing your favicon in /public

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'lib')));
app.use(express.static(path.join(__dirname, 'public')));



routes(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //console.error(err.stack);
  //res.locals.errormessage = err.message;
  res.locals.errorstack = req.app.get('env') === 'development' ? err.stack : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
