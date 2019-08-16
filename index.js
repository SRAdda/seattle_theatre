'use strict'

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const Show = require("./models/show");

app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + "/views")); // set loc for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions
app.use(bodyParser.json());

app.use("/api", require("cors")()); //set access-control-allow-origin header for api route

// set template "engine"
const handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");

// send static file as response
app.get('/', (req,res) => {
    Show.find({}, (err,shows) => {
        if (err) {
            console.log(err);
        }
            console.log(shows);
            res.render('home_hw7', {shows: JSON.stringify(shows)});            
    });
});

app.get('/api/details', (req,res,next) => {
    Show.find({}, (err, shows) => {
        if (err) return next(err);
        res.json(shows);
    });
});

app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About Page');
});

// add show
app.post("/api/add/", (req,res,next) => {
    if (!req.body._id) { //insert doc here
        let show = new Show({title:req.body.title, venue:req.body.venue, price:req.body.price});
        show.save((err,newShow) => {
          if (err) return next(err);
          console.log(newShow);
          res.json({updated: 0, _id: newShow._id});
        });
    } else {
        Show.updateOne({title: req.body.title}, {
            title:req.body.title,
            venue: req.body.venue,
            price: req.body.price }, (err,result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, title: req.body.title});
            console.log(result);
        });
    }
});

// Delete api
app.get("/api/delete/:id", (req,res, next) => {
    Show.deleteOne({ "_id": req.params.id }, (err, deleted) => {
        if (err) return next(err);
            res.json({"deleted": deleted});
            console.log(deleted);
    });
});

// Search
app.post('/details', (req,res,next) => {
    Show.findOne({ title: req.body.title }, (err, show) => {
        if (err) return next(err);
        res.json(show);
    });
});

// Search API
app.get('/api/details/:title', (req,res,next) => {
    Show.findOne({title: req.query.title }, (err,show) => {
        if (err) return next(err);
        res.json(show);
    });
});

// List of Shows
app.get('/details', (req,res,next) => {
    Show.findOne({"_id": req.query.id }, (err,show) => {
        if (err) return next(err);
        res.render("details", {result: show} );
    });
});

// app.get('/api/shows/:title', (req,res,next) => {
//     Show.findOne({ title: req.params.title }, (err, show) => {
//         if (err) return next(err);
//         res.json(show);
//     });
// });

// app.get("/api/shows", (req,res,next) => {
//     Show.find({}, (err, shows) => {
//         if (err) return next(err);
//         res.json(shows);
//     });
// });

// // send plain text response
// app.get("/about", (req,res) => {
//     res.type("text/plain");
//     res.send("about");
// });


// // add API
// app.post('/api/add/', (req,res,next) => {
//     // Add new or find and update an existing item
//     if (!req.body._id) {
//         let show = new Show({title:req.body.title, venue:req.body.venue, price:req.body.price});
//         show.save((err,newShow) => {
//             if (err) return next(err);
//             console.log(newShow);
//             res.json({updated: 0, _id: newShow._id});
//         });
//     } else {
//         Show.updateOne({title: req.body.title}, {
//             title: req.body.title,
//             venue: req.body.venue,
//             price: req.body.price }, (err, result) => {
//                 if (err) return next(err);
//                 res.json({updated: result.nModified, title: req.body.title});
//                 console.log(res

// 404 Handler
app.use((req,res) => {
  res.type("text/plain");
  res.status(404);
  res.send("Try again");
});

app.listen(app.get('port'), () => {
    console.log("Express started at " + __dirname);
});