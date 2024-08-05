const authRoutes = require("express").Router();
const {auth} = require('../utils/auth-config.js');
const {testApi,getUser,getOneUser,updateUser,deleteUser}  = require("../controller/authController.js");

// APPLY AUTH MIDDLEWARE TO ALL ROUTES
authRoutes.use(auth())

// TEST ROUTE
authRoutes.route('/test').get(testApi);

// GET ONE USER ROUTE
authRoutes.route("/:userId").get(getOneUser);

// GET ALL USERS ROUTE
authRoutes.route("/users").get(getUser);

// UPDATE USER ROUTE
authRoutes.route("/:userId").put(updateUser);

// DELETE USER ROUTE
authRoutes.route("/:userId").delete(deleteUser);


module.exports = authRoutes