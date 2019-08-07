import { connect, connection, Schema, model } from "mongoose";
import { connectionString } from "./credentials";

// remote db connection settings. For security, connectionString should be in a separate file not committed to git


connect(connectionString, { 
  dbName: "19theatre", 
  useNewUrlParser: true 
}); 

connection.on("open", () => {
  console.log("Mongoose connected.");
});

// define show model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = Schema({
 title: { type: String, required: true },
 venue: String,
 count: Number,
 price: String,
 }); 

export default model("Show", mySchema);

