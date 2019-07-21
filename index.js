'use strict'
const express = require("express");
const bodyParser = require("body-parser")
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set loc for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

// send static file as response
app.get('/', (req, res) => {
    console.log(req.query)
  res.type('text/html');
  res.sendFile(__dirname + '/public/home.html');
});

// send plain text response
app.get('/about', (_req, res) => {
  res.type('text/plain');
  res.send('About');
});

// define 404 handler
app.use( (req,res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});