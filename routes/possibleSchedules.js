
/*
 * GET availability reset page.
 */

exports.view = function(req, res){
	var email = req.params.email;


 	res.render('possibleSchedulesA', {email});
};