const express = require('express')
const router = express.Router();
//middleware..
const checkAuth = require("../middlewares/checkAuth");
// const checkAdmin = require("../middlewares/checkAdmin");

//projects controllers
const {
    registerProject,
    
  } = require("../controllers/project.controller");


//routes
//check auth later
router.post("/register-project", registerProject);


module.exports = router;