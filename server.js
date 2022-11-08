const express = require('express');
const ObjectId = require('mongodb').ObjectId;
// Run npm install mongodb, require mongodb to setup db connection
const mongodb = require('mongodb').MongoClient;

const app = express();
const port = 3001;

// Connection string to localhost instance of MongoDB and specific instance of database 
const connectionStringURI = `mongodb://127.0.0.1:27017/socialnetworkDB`;

// Declare and initilize variable to hold database connection
let db;

// // Create connection to MongoDB and return database reference
// mongodb.connect(
//   // Defines connection mongodb and app
//   connectionStringURI,
//   // Sets connection string parser and Server Discover and Monitoring engine to true and avoids warning
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err, client) => {
//     // Use client.db() constructor to add new db instance
//     db = client.db();

    //start port for server
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
//   }
// );

app.use(express.json());

// //create a new 
// app.post('/create', (req, res) => {
//   // Use db connection to add a document
//   db.collection('petCollection').insertOne(
//     { name: req.body.name, breed: req.body.breed },
//     (err, results) => {
//       if (err) throw err;
//       res.json(results);
//     }
//   );
// });

// app.get('/read', (req, res) => {
//   // Use db connection to find all documents in collection
//   db.collection('petCollection')
//     .find()
//     .toArray((err, results) => {
//       if (err) throw err;
//       res.send(results);
//     });
// });

// app.delete("/delete/:_id", (req, res) => {
//     db.collection('petCollection')
//     .deleteOne({ _id: ObjectId(req.params._id)}, (err, info) => {
//        if(err) throw err;
//        res.send(info);
//     });
// });
