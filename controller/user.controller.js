const User = require('../model/user.model')

//create user
const createUser = (async(req,res)=>{
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) { // returns true
    // generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }

})

//get all user
const getUser = (async(req,res) => {
  try{
    const { userId: userId } = req.params
    const user = await User.findOne({ userId: userId })
  if (!user) {
    res.status(404).send({
      status: 0,
      message: `Cannot find User with id=${userId}.`
    });
  }else{
    return res.status(200).json({ user })
  }
  }catch (error) {
    return res.status(404).send(error.message);
  }
  
})

//update user
const updateUser = (async(req,res)=>{
  try {
    const {userId:userId} = req.params

    const updatedUser = {
      userId: req.body.userId ? userId:undefined,
      name: req.body.name,
      email:req.body.email,
      age: req.body.age,
      phoneNo:req.body.phoneNo

    }
    var user = await User.find({ userId: userId });
    if(!user){
      return res.status(400).send({
        status: 0,
        message: "User not found",
      });
    }
    else{
      var user = await User.find({ email: req.body.email });
      if (user.length >= 1) {
      res.status(400).send({
        status: 0,
        message: "Email already exists!",
      });
    }else{
      const edituser = await User.findOneAndUpdate(
        { userId: userId },
        updatedUser,
        { new: true }
      );
      if(updatedUser.userId != undefined){
        return res.status(200).send({
          status: 1,
          message: "You haven't access to assing userid",
          edituser
        });
      }else{
        return res.status(200).send({
          status: 1,
          message: "User Updated",
          edituser
        });
      }

    }
      
  }   
} catch (error) {
    return res.status(404).send(error.message);
  }
})

//delete one user
const deleteUser = (async(req,res)=>{
  try{
    const { userId: userId } = req.params
    const user = await User.findOneAndDelete({ userId: userId })
    if (!user) {
      res.status(404).send({
        status: 0,
        message: `Cannot find User with id=${userId}.`
      });
    }else{
      return res.status(200).json({message:`User with id ${userId} has been deleted!`})

    }
  }catch (error) {
    return res.status(404).send(error.message);
  }
 
})



module.exports = {createUser,getUser,updateUser,deleteUser} 