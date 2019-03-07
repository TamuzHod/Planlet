var programs = require('../programs.json');

exports.register = async function(req, res){
   // req.app.locals.slectedClassesJson = JSON.stringify(req.body, null, 4);
   // console.log(req.app.locals.slectedClassesJson);
   // res.json(JSON.stringify(req.body, null, 4))

   const query = datastore
   .createQuery('user')
   .filter('email', '=', req.body.email)
   .limit(1);

   var user = await  datastore.runQuery(query);
   if(user.length = 1){
      var email = true;
      var password = false;
      res.render('index', {email, password});   
   }

   // Create a visit record to be stored in the database
   const newUser = {
   	timestamp: new Date(),
      email: req.body.email,
      data: req.body,
      password:  req.body.password,
      major: "noMajor",
      minor: "noMinor",
      college: "noCollege"
   };

   try {
   	await insertData(newUser);
      res.render('alittleaboutyou', programs);
   } catch (error) {
     console.log(error);
     res.end('error');
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
   .filter('password', '=', req.body.password)
   .limit(1);

   var user = await  datastore.runQuery(query);
   console.log(user);

   if(user.length = 0){
      var email = true;
      var password = false;
      res.render('index', {email, password});   
   }

   var major = user[0][0].major; 
   var minor = user[0][0].minor; 
   var college = user[0][0].college; 

   res.render('classes', {'majorName': major, 'minorName': minor, 'collegeName': college});     
};
