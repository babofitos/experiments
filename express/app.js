
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  // , user = require('./routes/user')
  , http = require('http')
  , path = require('path')

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('my secret string'))

  app.use(express.session({
    secret: 'my secret string',
    maxAge: 360000
  }))
  app.use(function(req, res, next) {
    res.locals.session = req.session
    next()
  })
  app.use(app.router);
  app.use(function(err, req, res, next) {
    if (err) res.send('Something went wrong', 500)
  })
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

require('./routes/index')(app)
require('./routes/users')(app)
require('./routes/session')(app)

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'))
})

