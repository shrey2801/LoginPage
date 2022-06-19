const { verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const { verifyJwtToken } = require("../model/user.model");
const userDataBase = require('../model/user.model.mongo');
const postDataBase = require('../model/post.model.mongo')

const auth = async (req, res, next) => {
  
      const token = req.header("Authorization")
      if(token){
        
        //const decoded = await verifyJwtToken(token);
        const decode = await verifyJwtToken(token)
        console.log(decode);
        
        if(decode){
          req.authId = decode._id
          console.log(decode._id);  
          next()
        }
        else{
          return res.status(500).send("Invalid Token")
        }
        
      }
}
  module.exports =  {auth};
  