const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
//middleware..
const checkAuth = require("../middlewares/checkAuth");
//const checkAdmin = require("../middlewares/checkAdmin");

// const fetchAllUser = require('../controllers/user.controller');
const { registerUser,updateUser,fetchUsers,getUserById,deleteUser } = require("../controllers/user.controller");

router.get("/fetch", checkAuth, fetchUsers);
router.post("/addUser", checkAuth, registerUser);
router.post("/updateUser", checkAuth, updateUser );
router.get('/getuserbyid/:id', getUserById);
router.delete('/delete/:id', checkAuth, deleteUser);
module.exports = router;
