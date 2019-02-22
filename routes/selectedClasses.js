var fs = require("fs");
var path = require('path');


exports.view = function(req, res){
    var filePath = path.dirname(require.main.filename) + "/tmp/selectedClasses.json";
	fs.writeFile(filePath, JSON.stringify(req.body, null, 4), (err) => {
    if (err) {
        console.error(err);
        res.send(filePath + " error");

        return;
    };
    	console.log("File has been created: " + filePath);
    	console.log(JSON.stringify(req.body));

	});
    req.app.locals.slectedClassesJson = JSON.stringify(req.body, null, 4);

    res.json(JSON.stringify(req.body, null, 4))
};