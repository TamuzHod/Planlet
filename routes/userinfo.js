
/*
 * GET userinfo reset page.
 */
var data = require('../users.json');
var programs = require('../programs.json');

exports.view = function (req, res) {
	var email = req.params.email;
	var major = req.params.major; 
	var minor = req.params.minor; 
	var college = req.params.college; 
	res.render('userinfo',[programs, {'email' : email, 'majorName': major, 'minorName': minor, 'collegeName': college}]);
};