var data = require('../schedule-data.json');

exports.view = function(req, res){
    res.render('possibleSchedules', data);
 };


