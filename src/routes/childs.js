const express = require("express");
const router = express.Router();

const childController = require("../controllers/childController");

router.get("/child", childController.all);


module.exports = router;