// Config environment variables.
if (process.env.NODE !== 'production') {
  require('dotenv').config({path : "./.secret/.env"})
}

// Initialize an express app with some configurations.
// Loaded the neccessary libraries
const express = require('express')
const app = express()     // initialize an express app
const morgan = require('morgan'); // HTTP request logger middleware 
const {connectDB} = require('./utils/db_client')

// Config an express for incoming requests.
app.use(morgan("common"))
app.use(express.json())  // Process request as 'json'
app.use(express.urlencoded({ extended: false })) // Process request wihtout 'url-encoded'

// Config an express app on localhost in development environment.
app.listen(process.env.PORT , function () {
  console.log(`Server is listening on %d in %s environment`, this.address().port, app.settings.env)
})

// Check the db connection 
connectDB().catch(console.dir);






