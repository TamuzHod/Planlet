'use strict';

const fs = require('fs');

var rawdata = fs.readFileSync('schedule-data.json');  
var classes = JSON.parse(rawdata);  

exports.view = function(req, res){
    res.render('possibleSchedules', classes);
 };


