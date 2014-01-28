var Base = require('./base');

module.exports = function(db) {
    var model = new Base(db);

    return model.extend({
        find: function(query, next) {
        	this.articles().find(query, {}, function (err, docs) {
        		if (err)
        			next(err);

        		next(null, docs);
        	});
        },
        get: function(id, next) {
            this.articles().findOne({ _id: id }, {}, function (err, doc) {
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
        update: function(article, next) {
            this.articles().update({_id: article._id}, article, function (err, updatedArticle) {
                if (err)
                    next(err);

                next();
            });
        }
    });
}