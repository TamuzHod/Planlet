
//var selectedClasses = require('./selectedClasses.json');

var fs = require("fs");
var path = require('path');

var content;
exports.send = async function(req, res){

	//content = req.app.locals.slectedClassesJson;
	var email = req.params.email; 

	const query = datastore
	 	.createQuery(['selectedClasses',email])

 	content = await  datastore.runQuery(query);
	console.log(content);
	res.json(content[0][0].jsonData);          
	
};

