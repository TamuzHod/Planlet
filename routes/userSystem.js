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
   try {
   	await insertData(newUser, datastore.key([kind, newUser.email]));
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
 function insertData(data, key) {
   console.log("saved " + data);
 	return datastore.save({
 		key: key,
 		data: data,
 	});
 }

};

exports.update = async function(req, res){
   var taskKey = datastore.key([kind, req.body.email]);
   console.log('updating = ' + taskKey);

   var user = await  datastore.get(taskKey);

   user = user[0];
   console.log(user);
   user.timestamp = new Date(),
   user.major = req.body.major;
   user.minor = req.body.minor;
   user.college = req.body.college;
   console.log("changed too " + user);
   try {
      await insertData(user, taskKey);
   } catch (error) {
      res.send(error); 
      console.log(error);
   }
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

   taskKey = datastore.key(['selectedClasses', req.body.email]);
   var selectedClasses = await  datastore.get(taskKey);
   selectedClasses = selectedClasses[0];

   if(selectedClasses){
      console.log("no Major");
      var response = {
         succses: true,
         error: 'Sucssess',
         address: '/possibleSchedules/'+req.body.email
      }
      res.json(response);    
   } else if(major === "noMajor"){
      console.log("no Major");
      var response = {
         succses: true,
         error: 'Sucssess',
         address: '/alittleaboutyou/'+user.email
      }
      res.json(response);   
   }
   else {
      var response = {
         succses: true,
         error: 'Sucssess',
         address: '/classes/' + user.email +'/'+ major +'/'+ minor + '/' + college
      }
      res.json(response); 
   }       
};
