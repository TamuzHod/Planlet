
var fs = require("fs");
var path = require('path');

var content;
exports.send = async function(req, res){

	//content = req.app.locals.slectedClassesJson;
	var email = req.params.email; 

	var taskKey = datastore.key(['selectedClasses',email]);
	var content = await  datastore.get(taskKey);
	content = content[0];

	console.log(content);
	res.json(content.jsonData);          
	
};

