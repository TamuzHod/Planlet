
/*
 * GET classes page.
 */

exports.view = function(req, res){
	var major = req.params.major; 
	console.log("The major  is: " + major);
 	res.render('classes', {
    'majorName': major
  });
};