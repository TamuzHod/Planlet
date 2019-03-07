
/*
 * GET login page.
 */

exports.view = function(req, res){
	var email = true;
	var password = true;
  res.render('index', {email, password});
};