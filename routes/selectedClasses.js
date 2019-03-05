var fs = require("fs");
var path = require('path');
exports.view = function(req, res){
   // req.app.locals.slectedClassesJson = JSON.stringify(req.body, null, 4);
   // console.log(req.app.locals.slectedClassesJson);
   // res.json(JSON.stringify(req.body, null, 4))

   // Create a visit record to be stored in the database
   const selectedClasses = {
   	timestamp: new Date(),
   	jsonData: req.body
   };

   try {
   	insertData(selectedClasses);
   	const query = datastore
	 	.createQuery('selectedClasses')
	 	.order('timestamp', {descending: true})
	 	.limit(1);

 	content = datastore.runQuery(query);

	res.json(JSON.parse(content.jsonData));    
   } catch (error) {
   	res.send(error);
   }

/**
 * Insert a selectedClasses record into the database.
 *
 * @param {object} selectedClasses The selectedClasses record to insert.
 */
   function insertData(selectedClasses) {
 	return datastore.save({
 		key: datastore.key('selectedClasses'),
 		data: selectedClasses,
 	});
 	console(req.app.locals.datastore);
 }

};


