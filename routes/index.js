
/*
 * GET login page.
 */

exports.view = function(req, res){
	var email = false;
	var password = false;
  res.render('index', {email, password});
};