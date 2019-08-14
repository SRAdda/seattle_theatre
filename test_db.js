const Show = require("./models/show");

// insert a new document into the database
// new Show({title:"Miss Saigon", venue:"Paramount Theater", price:"$$$"});

Show.countDocuments((_err, result) => {
    console.log(result);
});

// find all documents
Show.find({}, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        // otherwise output the array of documents
        console.log(result);
    }
});