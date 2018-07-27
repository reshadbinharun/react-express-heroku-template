const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
//for mongoDB
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
//for mongo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//mongo
//var uristring = process.env.MONGODB_URI;
//does not work when used as env variable
var uristring = 'mongodb://heroku_0ln280rt:sd79cdptp2tcr40jqf2ddba1mi@ds147461.mlab.com:47461/heroku_0ln280rt';

mongoose.connect(uristring, function (error){
	if(error) console.log("error");
	else console.log("mongo connected");
});

// defining the schema
const Schema = new mongoose.Schema({
	id: String,
	title: String,
	completed: Boolean
});

const Todo = mongoose.model('CustomTodo', Schema); //todo schema for mongo

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//MONGO test routes:

app.get('/api/todos', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    console.log("get route used!");
    Todo.find( function ( err, todos ){
      res.json(200, todos);
    });
  });

app.post('/api/todos', function (req, res) {
    var todo = new Todo( req.body );
    todo.id = todo._id;
    console.log("post route for db used");
    // http://mongoosejs.com/docs/api.html#model_Model-save
    todo.save(function (err) {
      res.json(200, todo);
    });
  });

app.del('/api/todos', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-remove
    Todo.remove({ completed: true }, function ( err ) {
      res.json(200, {msg: 'OK'});
    });
  });

//MONGO needs on back-end:
/*
dependencies: mongoose, bodyParser
mongoose.connect
set up schema
make instance of Schema using mongoose.model
post, get, del
*/

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);