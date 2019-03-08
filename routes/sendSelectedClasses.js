
var fs = require("fs");
var path = require('path');

var content;
exports.send = async function(req, res){

	//content = req.app.locals.slectedClassesJson;
	var email = req.params.email; 

	var taskKey = datastore.key(['selectedClasses',email]);
	var user = await  datastore.get(taskKey);
	user = user[0];

	content = await  datastore.runQuery(query);
	console.log(content);
	res.json(selectedClasses.jsonData);          
	
};

