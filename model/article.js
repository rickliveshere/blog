var Base = require('./base');

module.exports = function(db) {
    var model = new Base(db);

    return model.extend({
        find: function(query, next) {
        	this.articles().find( { $query: query, $orderby: { updated: 1, created: 1 } }, {}).toArray(function (err, articles) {
                if (err)
                    next(err);

                next(null, articles);
            });
        },
        get: function(id, next) {
            this.articles().findOne({ _id: id }, { }, function (err, doc) {
        		if (err)
        			next(err);

        		next(null, doc);
        	});
        },
        insert: function(article, next) {
            this.articles().insert(article, {safe:true}, function (err, insertedArticle) {
        		if (err)
        			next(err);

        		next();
        	});
        },
        update: function(id, article, next) {
            this.articles().update({_id: id}, { $set: article }, function (err, updatedArticle) {
                if (err)
                    next(err);

                next();
            });
        }
    });
}