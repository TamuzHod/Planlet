var programs = require('../programs.json');
const kind = 'user';

exports.register = async function(req, res){
   // req.app.locals.slectedClassesJson = JSON.stringify(req.body, null, 4);
   // console.log(req.app.locals.slectedClassesJson);
   // res.json(JSON.stringify(req.body, null, 4))


   var taskKey = datastore.key([kind, req.body.email]);
   var user = await  datastore.get(taskKey);
   user = user[0];

   if(user){
      var response = {
         succses: false,
         error: 'A user with this email alredy exsists',
         address: '/'
      }

      res.json(response);   
   }

   // Create a visit record to be stored in the database
   const newUser = {
   	timestamp: new Date(),
      email: req.body.email,
      password:  req.body.password,
      major: "noMajor",
      minor: "noMinor",
      college: "noCollege"
   };
   console.log("saved " + [kind, newUser.email]);

   try {
   	await insertData(newUser);
      var response = {
         succses: true,
         error: 'Sucssess',
         address: '/alittleaboutyou/'+newUser.email
      }
      res.json(response);   
   } catch (error) {
     console.log(error);
      var response = {
         succses: false,
         error: 'Error upon enetering data to database' + error,
         address: '/'
      }
     res.json(response);
  }

/**
 * Insert a selectedClasses record into the database.
 *
 * @param {object} selectedClasses The selectedClasses record to insert.
 */
 function insertData(newUser) {
   console.log("saved " + [kind, newUser.email]);
 	return datastore.save({
 		key: datastore.key([kind, newUser.email]),
 		data: newUser,
 	});
 }

};

exports.update = async function(req, res){
   var taskKey = datastore.key([kind, req.body.email]);
   var user = await  datastore.get(taskKey);
   user = user[0];
   user.major = req.body.major;
   user.minor = req.body.minor;
   user.college = req.body.college;

   ds.save(taskKey, user);
};

exports.logIn = async function(req, res){

   //content = req.app.locals.slectedClassesJson;

   var taskKey = datastore.key([kind, req.body.email]);
   var user = await  datastore.get(taskKey);
   user = user[0];
   console.log(user);


   if(!user || user.password != req.body.password){
      console.log("wrong password or email");

      var response = {
         succses: false,
         error: 'Wrong password or email',
         address: '/'
      }
      res.json(response);    
   }

   var major = user.major; 
   var minor = user.minor; 
   var college = user.college; 
   if(major === "noMajor"){
      console.log("no Major");
      var response = {
         succses: true,
         error: 'Sucssess',
         address: '/alittleaboutyou/'+user.email
      }
      res.json(response);   
   }
   else 
      var response = {
         succses: true,
         error: 'Sucssess',
         address: '/classes/' + user.email +'/'+ major +'/'+ minor + '/' + college
      }
      res.json(response);        
};
