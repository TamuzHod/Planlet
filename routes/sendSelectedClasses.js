
var fs = require("fs");
var path = require('path');

var content;
exports.send = async function(req, res){

	//content = req.app.locals.slectedClassesJson;
	var email = req.params.email; 


	var taskKey = datastore.key(['schedules', req.body.email]);
	var schedules = await  datastore.get(taskKey);
	schedules = schedules[0];

	if(schedules){
		res.json(schedules);
		else{
			taskKey = datastore.key(['selectedClasses',email]);
			var content = await  datastore.get(taskKey);
			content = content[0];

			console.log(content);
			res.json(content.jsonData);        
		}

		
		
	};

