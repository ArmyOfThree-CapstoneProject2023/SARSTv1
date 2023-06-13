//imports
//imported express for Node.js - helps with middleware
const express = require('express');
//import cors package to help with middleware routes and http requests
const cors = require('cors');
//import bodyparser package - parses middleware allowing us to use "req.body"
const bodyParser = require('body-parser');
//import mongoose package - connects to established mongoDB database
const mongoose = require('mongoose');

//imports to routes for middleware
//imports user routes
const userRoutes = require('./routes/user');
//imports resident routes
const residentRoutes = require('./routes/resident');

const app = express();

//mongoose connects Node.js/Express.js with the cloud mongodb SARSTdb
mongoose
  .connect(
    'mongodb+srv://Lcounts:' + process.env.MONGO_ATLAS_PWD + '@sarstdb.afmestn.mongodb.net/node-angular'
  )
  .then(() => {
    //this then func notifies the connection was successful
    console.log('Connection to database is established');
  })
  .catch(() => {
    //this 'catch' func notifies if the connection was not successful
    console.log('Connection to database is not established');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

//any request will be sent to the routes/user file
app.use('/api/user', userRoutes);

//request will be sent to the routes/register file
app.use('/api/resident', residentRoutes);

//exports middlewares to routes established
module.exports = app;
