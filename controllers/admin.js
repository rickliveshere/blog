
exports.newArticle = function(req, res){
  	res.render('admin/add-article');
};

exports.addArticle = function(req, res){

	var article = {
		title: req.body.title,
		content: req.body.content,
		created: new Date()
	};

	req.articles.insert(article, function(err) {
		if (err)
			next(err);

		res.locals = { title: article.title };
  		res.render('admin/article-submitted');
	});
};

exports.getArticle = function(req, res){

	req.articles.get(req.articleId, function(err, article) {
		if (err)
			next(err);

		res.locals = article;
  		res.render('admin/update-article');
	});
};

exports.updateArticle = function(req, res){

	var article = {
		title: req.body.title,
		content: req.body.content,
		updated: new Date()
	};

	req.articles.update(req.articleId, article, function(err) {
		if (err)
			next(err);

		res.locals = { title: article.title };
  		res.render('admin/article-updated');
	});
};

exports.listArticles = function(req, res){
  	req.articles.find({}, function(err, collection) {
		if (err)
			next(err);

		res.locals = { articles: collection };
  		res.render('admin/index');
	});
};