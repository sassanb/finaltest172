var router = require('express').Router();
var router = require('express').Router();
var post = require("./post");
var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var _ = require('lodash');
// connect to mongoDB database
var db = require("mongojs");
//Set - setting up global middleware
 app.use(morgan('dev'));
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());
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
mongoose.connect(uristring, function (err, res)// this part is connecting to MongoDB
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
var userSchema= new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true
    },

    address: {
      type: String,
      required: true,
      unique: true
      },
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

  author: {
    type: String,
    required: true
  },

  categories: {
    type: String,
    required: true
  },
});
var Post = mongoose.model('post2', PostSchema);
// this part is for back end.
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

// this part of the post function is for mongodb
app.post('/posts', function (req, res)
{
  var post = new Post(req.body);
  var post2 = req.body;
  console.log(post);
  post.save();
  res.json(post2);
  console.log("succesfully put into mongodb");
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
    var updated = _.assign(posts[post], update);
    res.json(updated);
  }
});

app.delete('/posts/:id', function (req, res)
{
  var post = _.findIndex(posts, { id: req.params.id });
  if (!posts[post]) {
    console.log("Error is occured for deleting the post");
    res.send("Error is occured for deleting the post");
  }
  else
  {
    console.log("The post was successfully deleted")
    res.send(posts[post]);
    posts.splice(post, 1);
  }
});

router.get(function(req, res, next){
	var err = new Error();
	err.status = 500;
	next(err);
});


router.use(function(err, req, res, next){
	if(err.status !== 500){
		return next();
	}else{

		res.send("invalid page");
	}
})

module.exports = router;
module.exports = app;


router.route('/')
  .get(function(req, res){
    console.log('user');
    res.send({ok: true});
  });

module.exports = router;
