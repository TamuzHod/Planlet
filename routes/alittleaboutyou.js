var programs = require('../programs.json');

exports.view = function(req, res){
  res.render('alittleaboutyou', programs);
};