
/*
 * GET availability reset page.
 */

exports.view = function(req, res){
	var major = req.params.major; 
	var minor = req.params.minor; 
	var college = req.params.college; 

 	res.render('possibleSchedulesA', {'majorName': major, 'minorName': minor, 'collegeName': college});
};

exports.viewAlt = function(req, res){
	var major = req.params.major; 
	var minor = req.params.minor; 
	var college = req.params.college; 

 	res.render('possibleSchedulesB', {'majorName': major, 'minorName': minor, 'collegeName': college});
};