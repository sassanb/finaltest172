// intro point for our server.
// PRO-TIP: if you have an index.js file
// on the root of a folder in node
// you can just require that folder and node will
// automatically require the index.js on the root
// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
//var port  	 = process.env.PORT || 8080; 				// set the port
//var database = require('./server/config/config'); 			// load the database config
var morgan   = require('morgan');
var bodyParser = require('body-parser');
//var methodOverride = require('method-override');



// configuration ===============================================================
//mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

//app.use(express.static('client')); 		// set the static files location /public/img will be /img for users
//app.use(morgan('dev')); // log every request to the console
//app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
//app.use(bodyParser.json()); // parse application/json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
//app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// setup config first before anything by requiring it
var port         = process.env.PORT || 8080;
var app = require('./server/server');





app.set('port', (process.env.PORT || 8080));
app.listen(port);
console.log('listening on ' + port);
