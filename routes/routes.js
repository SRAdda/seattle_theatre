const express = require('express');
const router = express.Router();

// define the home page route
router.get('/', (req, res) => {
  res.send('home page')
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About my app')
});

// get a list of shows from the db
router.get("/shows", function(_req,res) {
    res.send({type:"GET"});
});

//add a new show to the db
router.post("/shows", function(_req,res) {
    res.send({type:"POST"});
});

//update a show in the db
router.put("/shows/:id", function(_req,res) {
    res.send({type:"PUT"});
});

// delete a show from the db
router.delete("/shows/:id", function(_req,res) {
    res.send({type:"DELETE"});
});

module.exports = router;