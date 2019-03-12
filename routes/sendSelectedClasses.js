
var fs = require("fs");
var path = require('path');

var content;
exports.send = async function(req, res){

	//content = req.app.locals.slectedClassesJson;
	var email = req.params.email; 


	var taskKey = datastore.key(['schedules', email]);
	var schedules = await  datastore.get(taskKey);
	schedules = schedules[0];
	taskKey = datastore.key(['selectedClasses',email]);
	var content = await  datastore.get(taskKey);
	content = content[0];

    taskKey = datastore.key(['blockedTimes',email]);
	var blockedTimes = await  datastore.get(taskKey);
	blockedTimes = blockedTimes[0];


	if(schedules)
		schedules = JSON.parse(schedules.data);
    if(blockedTimes)
        blockedTimes = JSON.parse(blockedTimes.data);
	res.json({content, schedules, blockedTimes});



	};

