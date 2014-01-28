
/**
 * Module dependencies.
 */

var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var BSON = require('mongodb').BSONPure;
var admin = require('./controllers/admin');
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

// configure
app.configure('development', function() {
	app.use(express.errorHandler());
});

MongoClient.connect('mongodb://127.0.0.1:27017/rickliveshere', function(err, db) {
    if(err) {
        console.log('Sorry, there is no mongo db server running.');
    } else {

        var articles = require('./model/article')(db);


    	// middleware
        var attachArticleProvider = function(req, res, next) {
            req.articles = articles;
            next();
        };

        // params
        app.param('articleId', function(req, res, next, articleId) {
            req.articleId = BSON.ObjectID.createFromHexString(articleId);
            next();
        });

        // routes
        app.get('/admin/add', admin.newArticle);
		app.post('/admin/add', attachArticleProvider, admin.addArticle);

		app.get('/admin/update/:articleId', attachArticleProvider, admin.getArticle);
        app.post('/admin/update', attachArticleProvider, admin.updateArticle);
		//app.get('/blog', controllers.blog);
		//app.get('/about', controllers.about);
		//app.get('/contact', controllers.contact);
        
		http.createServer(app).listen(app.get('port'), function(){
  			console.log('Express server listening on port ' + app.get('port'));
		});
    }
});
