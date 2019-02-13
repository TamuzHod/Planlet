var data = require('../classes.json');

exports.view = function(req, res){
	var major = req.params.major; 
	var minor = req.params.minor; 
	var college = req.params.college; 

	console.log("The major  is: " + major);
 	res.render('classes', [data, {'majorName': major}, {'minorName': minor}, {'collegeName': college}]);
};