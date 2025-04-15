const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../model/user.model')

const removeToken = async (req,res)=>{
  let access_token = req.body.token
  const token = access_token.replace(access_token,'')
  
  if(!token){
    res.status(200).send({
        status:0,
        message: "Token has been deleted successfully!"
    });
  }
  
}

const getToken = async (req,res)=>{
    let object = req.body

    if (!object) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }else if (!object.email) {
      res.status(400).send({
        status: 0,
        message: "Email is required.",
      });
    }else if (!req.body.password) {
        res.status(400).send({
          status: 0,
          message: "Password is required.",
        });
      }else{
      const user = await User.find({ email: req.body.email });
      if (user.length >= 1) {
      res.status(400).send({
        status: 0,
        message: "Email already exists!",
      });
      }else{
        var final_id = object.userId
        final_id = final_id === undefined ? 0 : undefined
        // Add auto increment to the user id.
        User.count().then( (count) => {
          return count
        }).then(async(data)=>{
          final_id = data + 1 
    
          // save into user obj after validation
          let user = {
            userId: final_id,
            name: req.body.name,
            email:req.body.email,
            password:req.body.password,
          };
          await User.create(user)
          const json_token = jwt.sign(user,process.env.ACCESS_TOKEN)
          res.status(201).send({user,message:"And your token is ",json_token:json_token})
        })
      }
    }


    
}

module.exports = {getToken,removeToken}