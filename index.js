'use strict'

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const show = require('./lib/show');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set loc for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions
app.use(bodyParser.json());

//app.use('/api',require('cors')());

let handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', 
defaultLayout: false}));
app.set("view engine", ".html");


// send static file as response
app.get('/', (_req,res) => {
  res.type('text/html');
  res.sendFile(__dirname + '/public/home.html');
});

// send plain text response
app.get('/about', (_req,res) => {
  res.type('text/plain');
  res.send('About page');
});

app.get('/get', (req, _res) => {
  console.log(req.query); //display parsed querystring object
});

app.post('/get', (req, _res) => {
  console.log(req.body); // display parsed form submission
});

// handle form submission
app.post('/detail', (req, res) => {
  console.log(req.body)
  var found = show.getItem(req.body.title);
  console.log(found)
  res.render('detail', {
    title: req.body.title,
    result: found
  });
});

// define 404 handler
app.use((_req,res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});