var programs = require('../programs.json');

exports.register = async function(req, res){
   // req.app.locals.slectedClassesJson = JSON.stringify(req.body, null, 4);
   // console.log(req.app.locals.slectedClassesJson);
   // res.json(JSON.stringify(req.body, null, 4))

   // Create a visit record to be stored in the database
   const newUser = {
   	timestamp: new Date(),
      email: req.body.email,
   	data: req.body,
      password:  req.body.password,
   };

   try {
   	await insertData(newUser);
      res.render('alittleaboutyou', programs);
   } catch (error) {
      res.send('error');
   }

/**
 * Insert a selectedClasses record into the database.
 *
 * @param {object} selectedClasses The selectedClasses record to insert.
 */
   function insertData(newUser) {
 	return datastore.save({
 		key: datastore.key('user'),
 		data: newUser,
 	});
 }

};

exports.logIn = async function(req, res){

   //content = req.app.locals.slectedClassesJson;

   const query = datastore
      .createQuery('user')
      .filter('email', '=', req.body.email)
      .limit(1);

   content = await  datastore.runQuery(query);
   console.log(content);

   var major = req.params.major; 
      var minor = req.params.minor; 
      var college = req.params.college; 

      res.render('classes', {'majorName': major, 'minorName': minor, 'collegeName': college});     
};
