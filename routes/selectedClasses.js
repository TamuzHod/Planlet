var fs = require("fs");
var path = require('path');


exports.view = function(req, res){

	fs.writeFile(path.dirname(require.main.filename) + "/selectedClasses.json", JSON.stringify(req.body, null, 4), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    	console.log("File has been created");
    	console.log(JSON.stringify(req.body));

	});
  	res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
    });
    res.end('value = ' + JSON.stringify(req.body, null, 4));;
};