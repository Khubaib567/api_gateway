// config environment variables.
if(process.env.NODE !== 'production'){
  require('dotenv').config()
}

// initialize an express app with some configurations.
// loaded the neccessary libraries
const express = require('express')
const app = express()     // initialize an express app
const logger = require('morgan'); // HTTP request logger middleware 

// import routes
const authRoutes = require('./routes/authRoutes')
const publicRoutes = require('./routes/publicRoutes');

// display the UI
app.get('/',(req,res)=>{
  res.send("Server is running!")
})

// config an express for incoming requests.
app.use(logger("common"))
app.use(express.json())  // Process request as 'json'
// app.use(express.urlencoded({extended:false})) // Process request wihtout 'url-encoded'

// config routes
app.use('/secret',authRoutes)
app.use('/public',publicRoutes)

// config an express app on localhost in development environment.
app.listen(process.env.PORT || 4000, function(){
  console.log(`Server is listening on %d in %s environment`,this.address().port,app.settings.env)
})

// monogodb configuration
const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL,{
  useNewUrlParser:true, // allow the updated srv connection 
})

const db = mongoose.connection;

db.on("error", (error) => {
console.error(error);
});
db.once("open", () => {
console.log("Connected with Database!");
});



