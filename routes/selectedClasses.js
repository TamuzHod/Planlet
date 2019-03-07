var fs = require("fs");
var path = require('path');
exports.view = async function(req, res){
   // req.app.locals.slectedClassesJson = JSON.stringify(req.body, null, 4);
   // console.log(req.app.locals.slectedClassesJson);
   // res.json(JSON.stringify(req.body, null, 4))
   var email = req.params.email; 

   // Create a visit record to be stored in the database
   const selectedClasses = {
   	timestamp: new Date(),
   	jsonData: req.body
   };

   try {
   	await insertData(selectedClasses, email);
	res.json(JSON.parse(selectedClasses.jsonData));    
   } catch (error) {
   	res.send(error);
   }

/**
 * Insert a selectedClasses record into the database.
 *
 * @param {object} selectedClasses The selectedClasses record to insert.
 */
   function insertData(selectedClasses, id) {
 	return datastore.save({
 		key: datastore.key(['selectedClasses', id]),
 		data: selectedClasses,
 	});
 	console(req.app.locals.datastore);
 }

};


