
exports.view = async function(req, res){
   // req.app.locals.slectedClassesJson = JSON.stringify(req.body, null, 4);
   // console.log(req.app.locals.slectedClassesJson);
   // res.json(JSON.stringify(req.body, null, 4))
   var email = req.params.email; 

   // Create a visit record to be stored in the database
   const selectedClasses = {
   	timestamp: new Date(),
   	jsonData: req.body,
   };
   try {
   	await insertData(selectedClasses, datastore.key(['selectedClasses', email]));
         console.log("sucsees");
         datastore.key(['schedules', email]).delete()
	     res.json(selectedClasses.jsonData);    
   } catch (error) {
      console.log(error);
   	res.send(error);
   }

 function insertData(data, key) {
   console.log("saved ");
   console.log(data);
   return datastore.save({
      key: key,
      data: data,
   });
 }

};


