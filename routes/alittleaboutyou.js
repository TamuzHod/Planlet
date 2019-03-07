var programs = require('../programs.json');

exports.view = function(req, res){
  var email = req.params.email;
  res.render('alittleaboutyou', [programs, {'email' : email}]);
};

