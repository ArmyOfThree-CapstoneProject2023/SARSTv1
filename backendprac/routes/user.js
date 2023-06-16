const express = require('express');
//import bcrypt to encrypt passwords in database
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

//imported the user file from models/user
const User = require('../models/user');

const router = express.Router();


router.post('/register', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      username: req.body.username,
      accountType: req.body.accountType

    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: 'User created!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials"
        });
      });
  });
});



router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
  .then(user => {
    console.log(user);
      if (!user) {
        return res.status(401).json({
          message: "Auth failed lvl 1"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Auth failed lvl 2"
      });
    }
    const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, process.env.JWT_KEY, { expiresIn: "1h" } //after 1hour of inactivity the token expires and the user is logged out
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: "Invalid authentication credentials"
    })
  });
});

module.exports = router;
