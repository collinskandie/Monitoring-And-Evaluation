const express = require('express')
const router = express.Router();
//middleware..
const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");

//auth controllers
const {
    registerUser,
    fetchCurrentUser,
    handleAdmin,
    loginWithEmailOtp,
    verifyEmailOtp
  } = require("../controllers/auth.controller");


//routes  
router.post("/register",checkAuth, checkAdmin, registerUser);
router.post("/login", loginWithEmailOtp);
router.post("/otpverification",  verifyEmailOtp);
router.get("/me", checkAuth, fetchCurrentUser);
router.get("/admin", checkAuth, checkAdmin, handleAdmin);

module.exports = router;