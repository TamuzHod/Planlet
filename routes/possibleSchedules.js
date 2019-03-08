
/*
 * GET availability reset page.
 */

exports.view = function(req, res){
	var college = req.params.college; 

 	res.render('possibleSchedulesA', email);
};

exports.viewAlt = function(req, res){
	var college = req.params.college; 

 	res.render('possibleSchedulesB');
};