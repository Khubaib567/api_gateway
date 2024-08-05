const User = require('../db/users')

// TEST API
const testApi = (async(req,res)=>{
  try{
    await res.status(200).json({message:"Secret API is working!"})
  }catch (error) {
    await res.status(404).send(error.message);
  }

})


// GET USER
const getUser = (async(req,res) => {
  try{
    await res.status(200).json({message:"User has been retreived!"})
  }catch (error) {
    await res.status(404).send(error.message);
  }
  
})

// GET ONE USER
const getOneUser = (async(req,res) => {
  try{
    await res.status(200).json({message:"One User has been retreived!"})
  }catch (error) {
    await res.status(404).send(error.message);
  }
  
})

// UPDATE USER
const updateUser = (async(req,res)=>{
  try{
    await res.status(200).json({message:"User has been updated!"})
  }catch (error) {
    await res.status(404).send(error.message);
  }
})


// DELETE USER
const deleteUser = (async(req,res)=>{
  try{
    await res.status(200).json({message:"User has been deleted!"})
  }catch (error) {
    await res.status(404).send(error.message);
  }
 
})



module.exports = {testApi,getUser,getOneUser,updateUser,deleteUser} 