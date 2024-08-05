const publicRoutes = require("express").Router();
const {testApi,registerUser,loginUser,logoutUser} = require('../controller/publicController.js');

// TEST ROUTE
publicRoutes.route('/test').get(testApi)

// REGISTER ROUTE
publicRoutes.route("/register").post(registerUser); 

// LOGIN ROUTE
publicRoutes.route('/login').post(loginUser)

// LOGOUT ROUTE  
publicRoutes.route('/logout').post(logoutUser)




module.exports = publicRoutes