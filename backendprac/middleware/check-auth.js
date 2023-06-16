//import JWT
const jwt = require('jsonwebtoken');

//export function for files to use
module.exports = (req, res, next) => {
  try{
  //gets the token as headers parameter
  const token = req.headers.authorization.split(' ')[1];
  //verifies the captured token with the algorithm
  jwt.verify(token, process.env.JWT_KEY);
  next();
  }catch(error){
    res.status(401).json({message: 'You are not authenticated'});
  }
}
