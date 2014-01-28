var _ = require("underscore");

module.exports = function(db) {
	this._db = db;
};

module.exports.prototype = {
	extend: function(child) {
        return _.extend({}, this, child);
    },
    articles: function() {
        if(this._articles) return this._articles;
        return this._articles = this._db.collection('articles');
    }
};