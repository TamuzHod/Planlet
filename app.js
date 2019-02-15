
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var alittleaboutyou = require('./routes/alittleaboutyou');
var classes = require('./routes/classes');
var forgottenPassword = require('./routes/forgottenPassword');
var availability = require('./routes/availability');
var userinfo = require('./routes/userinfo');
var possibleSchedules = require('./routes/possibleSchedules');
//var possibleSchedulesJSON = require('./routes/scheduleJson');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
app.get('/alittleaboutyou', alittleaboutyou.view);
app.get('/forgottenPassword', forgottenPassword.view);
app.get('/classes/:major/:minor/:college', classes.view);
app.get('/availability/:major/:minor/:college', availability.view);
app.get('/userinfo', userinfo.view);
app.get('/possibleSchedules', possibleSchedules.view);

var jsonSchdeuleData = require('./schedule-data.json');
app.get('/scheduleJson', (req, res) => {
  res.json(jsonSchdeuleData);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
availability