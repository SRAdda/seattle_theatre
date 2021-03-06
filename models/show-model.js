const mongoose = require("mongoose");
const credentials = require("./credentials");

// remote db connection settings. For security, connectionString should be in a separate file not committed to git

mongoose.connect(credentials.connectionString, { 
  dbName: "19theatre", 
  useNewUrlParser: true 
}); 

mongoose.connection.on("open", () => {
  console.log("Mongoose connected.");
});

// define show model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
 title: { type: String, required: true },
 venue: String,
 count: Number,
 price: String,
 }); 

module.exports = mongoose.model("Show", mySchema);

