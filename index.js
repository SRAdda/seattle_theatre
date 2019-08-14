"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const Show = require("./models/show");
//const Show = require("./models/show");

app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + "/views")); // set loc for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions
app.use(bodyParser.json());
app.use("/api", require("cors")()); //set access-control-allow-origin header for api route

// set template "engine"
const handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: ".html", defaultLayout: false}));
app.set("view engine", ".html");


// send static file as response
app.get('/', (req,res) => {
    Show.find({}, (err,shows) => {
        if (err) {
            console.log(err);
        }
            console.log(shows);
            res.render('home', {shows: JSON.stringify(shows)});
    });
});

app.get('/api/shows/:title', (req,res,next) => {
    Show.findOne({ title: req.params.title }, (err, show) => {
        if (err) return next(err);
        res.json(show);
    });
});

app.get("/api/shows", (req,res,next) => {
    Show.find({}, (err, shows) => {
        if (err) return next(err);
        res.json(shows);
    });
});

// send plain text response
app.get("/about", (req,res) => {
    res.type("text/plain");
    res.send("about");
});

// add show
app.post("/api/add/", (req,res,next) => {
    if (!req.body.title) { //insert doc here
        let show = new Show({title:req.body.title, venue:req.body.venue, price:req.body.price});
        show.save((err,newShow) => {
          if (err) return next(err);
          res.json({updated: 0, title: newShow.title});
        });
    } else {
        Show.updateOne({title: req.body.title}, {
            title:req.body.title,
            venue: req.body.venue,
            price: req.body.price }, (err,result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, title: req.body.title});
        });
    }
});

// add API
app.get('/api/add/:title/:venue/:price', (req,res,next) => {
    let title = req.params.title;
    Show.update({ title: title}, {title: title, venue: req.params.venue, price: req.params.price },
        {upsert: true }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified});
    });
});

app.get("/api/delete/:title", (req,res, next) => {
    Show.deleteOne({ title: req.params.title }, (err, deleted) => {
        if (err) return next(err);
        Show.countDocuments((err, total) => {
            res.json(deleted);
        });
    });
});

app.post('/details', (req,res,next) => {
    Show.findOne({ title: req.body.title }, (err, show) => {
        if (err) return next(err);
        res.json(show);
    });
});



// link to details
app.get('/details', (req,res,next) => {
    Show.findOne({ title: req.query.title }, (err,show) => {
        if (err) return next(err);
        res.render("details", {result: show} );
    });
});


// define 404 handler
app.use((req,res) => {
  res.type("text/plain");
  res.status(404);
  res.send("Try again");
});

app.listen(app.get('port'), () => {
    console.log("Express started at " + __dirname);
});