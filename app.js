
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
var selectedClasses = require('./routes/selectedClasses');
var sendSelectedClasses = require('./routes/sendSelectedClasses');

var app = express();

const crypto = require('crypto');
const Datastore = require('@google-cloud/datastore');
const datastore = Datastore();

//app.locals.dataStore = Datastore;

/**
 * Insert a visit record into the database.
 *
 * @param {object} visit The visit record to insert.
 */
function insertVisit(visit) {
  return datastore.save({
    key: datastore.key('visit'),
    data: visit,
  });
}

/**
 * Retrieve the latest 10 visit records from the database.
 */
function getVisits() {
  const query = datastore
    .createQuery('visit')
    .order('timestamp', {descending: true})
    .limit(10);

  return datastore.runQuery(query);
}

app.get('/visit', async (req, res) => {
  // Create a visit record to be stored in the database
 const visit = {
    timestamp: new Date(),
    // Store a hash of the visitor's ip address
    userIp: crypto
      .createHash('sha256')
      .update(req.ip)
      .digest('hex')
      .substr(0, 7),
  };

  try {
    await insertVisit(visit);
    const results = await getVisits();
    const entities = results[0];
    const visits = entities.map(
      entity => `Time: ${entity.timestamp}, AddrHash: ${entity.userIp}`
    );
    res
      .status(200)
      .set('Content-Type', 'text/plain')
      .send(`Last 10 visits:\n${visits.join('\n')}`)
      .end();
  } catch (error) {
    res.send(error);
  }
});


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
app.get('/userinfo/:major/:minor/:college', userinfo.view);
app.get('/possibleSchedules/', possibleSchedules.view);
app.get('/possibleSchedulesB/', possibleSchedules.viewAlt);

app.locals.slectedClassesJson;

app.post('/selectedClasses', selectedClasses.view);

app.get('/getSelectedClasses', sendSelectedClasses.send);

var jsonClassesData = require('./classes.json');
app.get('/classes', (req, res) => {
  res.json(jsonClassesData);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
