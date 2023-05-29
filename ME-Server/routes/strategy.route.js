const express = require('express')
const router = express.Router();
//middleware..
const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");

const {myStrategies, addStrategy,allStrategies } = require("../controllers/strategy.controller");

router.get("/fetch",checkAuth,allStrategies);
router.get("/fetch/:id",checkAuth,myStrategies);
router.post("/add",checkAuth,addStrategy);

router.get("/all-strategies",allStrategies);
router.post("/register-strategy",addStrategy);

module.exports = router;
