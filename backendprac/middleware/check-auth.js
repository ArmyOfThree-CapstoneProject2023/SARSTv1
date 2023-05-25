//import JWT
const JWT = require('jsonwebtoken');

//export function for files to use
module.exports = (req, res, next) => {
  try{
  //gets the token as headers parameter
  const token = req.headers.authorization.split(' ')[1];
  //verifies the captured token with the algorithm
  jwt.verify(token, "secret_this_should_be_longer");
  next();
  }catch(error){
    res.status(401).json({message: 'Auth Failed Token'});
  }
}
