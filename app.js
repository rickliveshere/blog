
/**
 * Module dependencies.
 */

var express = require('express');
var controllers = require('./controllers');
var user = require('./controllers/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Mt#W2"HbJj+gp[:Gnwn~R-`Zs]bVzTmbbzj4VD#J'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'assets')));

// development only
app.configure('development', function() {
	app.use(express.errorHandler());
})

app.get('/', controllers.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
