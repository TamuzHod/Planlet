
var fs = require("fs");
var path = require('path');

var content;
exports.send = async function(req, res){

	//content = req.app.locals.slectedClassesJson;
	var email = req.params.email; 


	var taskKey = datastore.key(['schedules', email]);
	var schedules = await  datastore.get(taskKey);

	taskKey = datastore.key(['selectedClasses',email]);
	var content = await  datastore.get(taskKey);
	content = content[0];

	if(schedules){
		schedules = schedules[0];
		res.json({content, JSON.parse(schedules)});
	}else{
		

		console.log(content);
		res.json(content.jsonData);        
	}



	};

