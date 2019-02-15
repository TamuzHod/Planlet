
/*
 * GET userinfo reset page.
 */
var data =  require('../users.json');

exports.view = function(req, res){
  res.render('userinfo',
  {
    "name" : "Tamuz",
    "email" : "thod@ucsd.edu",
    "password" : "192837465",
    "major" : "Cogs: Design & Interaction",
    "minor" : "Computer Science",
    "college" : "Warren",
    "classesTaken" : [],
    "classesApproved" : []
  } );
};
