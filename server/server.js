var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var mongoose = require('mongoose');  
var morgan = require('morgan');
var bodyParser = require('body-parser');
// connect to mongoDB database 
mongoose.connect(config.db.url);
//Set - up global middleware
 app.use(morgan('dev'));
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());
 // front end from client folder
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//In a large application, 
//things could easily get out of control 
//if we keep adding code to a single 
//JavaScript file (server.js).
// So  move the routes-related code 
//into  api module .
app.use('/api/', api);

// API endpoints such as below has been moved to user Router within api module
//app.get('/user', function(req, res) {
   // res.send([{username:'wine1'}, {username:'wine2'}]);
//});
var posts = [];
var id = 0;

// implement back-end right here
app.get('/posts', function (req, res) {
  res.json(posts);
});

app.get('/posts/:id', function (req, res) {
  var post = _.find(posts, { id: req.params.id });
  res.json(post || {});
});

app.post('/posts', function (req, res) {
  var post = req.body;
  console.log(post);
  id++;
  post.id = id + '';

  posts.push(post);
  
  res.json(post);
  console.log("succesfully insert a post into posts array");
});

// export the app for testing
module.exports = app;
