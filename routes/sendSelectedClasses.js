
//var selectedClasses = require('./selectedClasses.json');

var fs = require("fs");
var path = require('path');

var content;
exports.send = function(req, res){
 //    var filePath = path.dirname(require.main.filename) + "/tmp/selectedClasses.json";
	// fs.readFile(filePath, "utf8", function read(err, data) {
	//     if (err) {
	//     	res.json("Failed to read file")
	//         throw err;
	//     }
	// });
	content = req.app.locals.slectedClassesJson;
	res.json(JSON.parse(content));          // Or put the next step in a function and invoke it
	
};