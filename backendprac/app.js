
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//imports user routes
const userRoutes = require('./routes/user');

const app = express();

//mongoose connects Node.js/Express.js with the cloud mongodb SARSTdb
mongoose
  .connect(
    'mongodb+srv://Lcounts:haptm140AxW25kyE@sarstdb.afmestn.mongodb.net/node-angular'
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

app.get('/',(req, res) => {
  res.end('it works!');
});

//any request will be sent to the userRoute file
app.use('/api/user', userRoutes);

module.exports = app;
