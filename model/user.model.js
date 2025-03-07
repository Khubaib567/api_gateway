const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: {
    type:Number,
    unique:[true,'id must be unique!'],
    default:0
  },
  name:{
    type:String,
    required:[true,'Name must be required!']
  },
  email: {
    type:String,
    required:[true,'Email must be required!'],
    unique:[true,'Email must be unique!'],
    match:[
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Please provide a valid email pattern!'
    ]
  },
  password:{
    type:String,
    required:[true,'Password must be required!']
  }
  
});


mongoose.exports = mongoose.model("user",userSchema)