
/*
 * GET userinfo reset page.
 */
var data = require('../users.json');

exports.view = function (req, res) {
	var major = req.params.major; 
	var minor = req.params.minor; 
	var college = req.params.college; 
	res.render('userinfo', {'majorName': major, 'minorName': minor, 'collegeName': college});
};