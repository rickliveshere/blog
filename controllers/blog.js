
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('blog', { title: 'Richard Read' });
};