
exports.view = async function(req, res){
   // req.app.locals.slectedClassesJson = JSON.stringify(req.body, null, 4);
   // console.log(req.app.locals.slectedClassesJson);
   // res.json(JSON.stringify(req.body, null, 4))
   var email = req.params.email; 

   // Create a visit record to be stored in the database
   const selectedClasses = {
      key: datastore.key(['selectedClasses', email]),
   	timestamp: new Date(),
   	jsonData: req.body
   };
   console.log("saving " + selectedClasses);

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
   function insertData(selectedClasses) {
         console.log(datastore.upsert(selectedClasses));
         console.log("saved " + selectedClasses);
 }

};


