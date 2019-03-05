
//var selectedClasses = require('./selectedClasses.json');

var fs = require("fs");
var path = require('path');

var content;
exports.send = function(req, res){

	//content = req.app.locals.slectedClassesJson;

	const query = datastore
	 	.createQuery('selectedClasses')
	 	.order('timestamp', {descending: true})
	 	.limit(1);

 	content = datastore.runQuery(query);

	res.json(JSON.parse(content.jsonData));          
	
};

