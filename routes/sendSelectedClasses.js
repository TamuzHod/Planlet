
var fs = require("fs");
var path = require('path');

var content;
exports.send = async function(req, res){

	//content = req.app.locals.slectedClassesJson;
	var email = req.params.email; 


	var taskKey = datastore.key(['schedules', email]);
	var starredStatus = await  datastore.get(taskKey);
	starredStatus = starredStatus[0];

	if(schedules){
		content.starredStatus = starredStatus;
		res.json(content);
	}else{
		taskKey = datastore.key(['selectedClasses',email]);
		var content = await  datastore.get(taskKey);
		content = content[0];

		console.log(content);
		res.json(content.jsonData);        
	}



	};

