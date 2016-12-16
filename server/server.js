
var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var _ = require('lodash');
// connect to mongoDB database
// mongoose.connect(config.db.url);
var db = require("mongojs");
//Set - up global middleware
 app.use(morgan('dev'));
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());
 // front end from client folder
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/', api);

// API endpoints such as below has been moved to user Router within api module
//app.get('/user', function(req, res) {
   // res.send([{username:'wine1'}, {username:'wine2'}]);
//});
var posts = [];
var id = 0;

// connect to database
var mongoose = require ("mongoose");
var uristring = 'mongodb://localhost/test';
// Set the uristring based on where the MongoDB is running.
mongoose.connect(uristring, function (err, res)
{
  if (err)
  {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  }
  else
  {
    console.log ('successfully connect to: ' + uristring);
  }
});

var PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  text: {
    type: String,
    required: true
  },
});
var Post = mongoose.model('post2', PostSchema);
// implement back-end right here
app.get('/posts', function(req, res)
{
    Post.find({}, function(err, post)
    {
      res.json(post);
    });
});

app.get('/posts/:id', function (req, res) {
  var post = Post.find(req.params.id);
  res.json(post || {});
});

// this post function is for mongodb
app.post('/posts', function (req, res)
{
  var post = new Post(req.body);
  var post2 = req.body;
  console.log(post);
  post.save();
  res.json(post2);
  console.log("succesfully insert into mongodb");
});

app.put('/posts/:id', function (req, res)
{
  var update = req.body;
  if (update.id) {
    delete update.id
  }
  console.log(update.id)

  var post = _.findIndex(posts, { id: req.params.id });
  if (!posts[post]) {
    res.send();
  } else {
    var updatedLion = _.assign(posts[post], update);
    res.json(updatedLion);
  }
});

app.delete('/posts/:id', function (req, res)
{
  var post = _.findIndex(posts, { id: req.params.id });
  if (!posts[post]) {
    console.log("Error in deleting the post");
    res.send("Error in deleting the post");
  }
  else
  {
    console.log("successfully deleted")
    res.send(posts[post]);
    posts.splice(post, 1);
  }
});


module.exports = app;
