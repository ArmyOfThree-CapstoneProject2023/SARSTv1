const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const userRoutes = require('./routes/user');

const app = express();

//mongoose connects Node.js/Express.js with the cloud mongodb SARSTdb
mongoose.connect('mongodb+srv://Lcounts:haptm140AxW25kyE@sarstdb.afmestn.mongodb.net/?retryWrites=true&w=majority')
//this then func notifies the connection was successful
.then(() => {
  console.log('Connection to database is established')
})
//this 'catch' func notifies if the connection was not successful
.catch(() => {
  console.log('Connection to database is not established')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  reduce.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use('./api/user', userRoutes)

module.exports = app;
