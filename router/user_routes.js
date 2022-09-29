var router = require("express").Router();
const {createUser,getUser,updateUser,deleteUser} = require("../controller/user.controller.js");
const {getToken,removeToken} = require('../controller/json_token')
const {auth} = require('../middleware/auth-config');

// REGISTER request API
router.route("/signUp").post(getToken);

// LOGIN request API
router.route("/signIn").post(getToken);

//DELETE JWT token API 
router.route('/signOut').delete(removeToken)

// POST request API
router.route("/").post(auth(),createUser);

// GET request API
router.route("/:userId").get(auth(),getUser);

// UPDATE request API
router.route("/:userId").put(auth(),updateUser);

// DELETE request API
router.route("/:userId").delete(auth(),deleteUser);



module.exports = router