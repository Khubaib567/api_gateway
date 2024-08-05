const users = require('../db/users')
const {generateToken,removeToken} = require('../utils/jsonToken');


// TEST API 
const testApi = (async(req,res)=>{
  try{
    await res.status(200).json({message:"Public API is working!"})
  }catch (error) {
    await res.status(404).send(error.message);
  }

})



// REGISTER USER
const registerUser = (async(req,res)=>{
  try{
    const { name, email, password } = req.body;

    const user = {
      name: name,
      email: email,
      password: password,
    };

    // if the user has exist based on it's email
    const userExists = users.has(email)
    
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    } else{
      users.set(user.email,user)
      generateToken(res,user)
      await res.status(200).json({message:"User has been registered!"})
    }
  
  }catch (error) {
    await res.status(404).send(error.message);
  }

})

// LOGIN USER
const loginUser = (async(req,res)=>{
  try{
    const { email, password } = req.body;

    const user = users.get(email)
    // console.log(user)

  if (user && await user.password === password) {
    generateToken(res, user);
    await res.status(200).json({message:"User has been login!"})
    
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  }catch (error) {
    await res.status(404).send(error.message);
  }
 
})

// LOGOUT USER
const logoutUser = (async(req,res)=>{
  try{
    removeToken(req,res)
    await res.status(200).json({message:"User has been logout!"})
    
  }catch (error) {
    await res.status(404).send(error.message);
  }
})



module.exports = {testApi,registerUser,loginUser,logoutUser} 