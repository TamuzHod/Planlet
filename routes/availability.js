
/*
 * GET availability reset page.
 */

exports.view = function(req, res){
 	res.render('availability', {email: req.params.email});
};