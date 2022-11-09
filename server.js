const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Run npm install mongodb, require mongodb to setup db connection
const mongodb = require('mongodb').MongoClient;

//server init
const app = express();
const PORT = process.env.PORT || 3001;

//middleware for JSON 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//listening to port
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});