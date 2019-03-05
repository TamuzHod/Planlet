
//var selectedClasses = require('./selectedClasses.json');

var fs = require("fs");
var path = require('path');

var content;
exports.send = async function(req, res){

	//content = req.app.locals.slectedClassesJson;

	const query = datastore
	 	.createQuery('selectedClasses')
	 	.order('timestamp', {descending: true})
	 	.limit(1);

 	content = await  datastore.runQuery(query);
	console.log(content);
	res.json(content);          
	
};

