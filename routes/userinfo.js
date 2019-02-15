
/*
 * GET userinfo reset page.
 */
var data = require('../users.json');

exports.view = function (req, res) {
	res.render('userinfo'); res.render('userinfo',
		{
			"name": "Tamuz",
			"email": "thod@ucsd.edu",
			"password": "192837465",
			"major": "COGS",
			"minor": "CSE",
			"college": "Warren",
			"classesTaken": [],
			"classesApproved": []
		});
};