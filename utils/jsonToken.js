const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../db/users')

// controller for generate token when register request
const generateToken = async (res,user)=>{
  const token = jwt.sign(user,process.env.ACCESS_TOKEN,{
    expiresIn: '30d',
  })
  await res.cookie('jwt',token, {
    httpOnly:true,
    secure: process.env.NODE !== 'development', // hide cookies in production 
    sameSite:'strict', // prevent attacker to hacks user's activity when user come from different origin.
    maxAge: 30*24*60*60*1000 // expires in 30 days.
  })
  
  // res.status(201).send({user,message:"And your token is ",json_token:json_token})

}


// controller for remove token when logout request
const removeToken =  async (req,res)=> {
  const header = req.headers.cookie;
  const token = header && header.replace(header,'')
  await res.cookie('jwt', token, {
    httpOnly: true,
    expires: new Date(0),
  });
}
  

 
    

module.exports = {generateToken,removeToken}