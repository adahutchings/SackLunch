const express = require("express");
const router = express.Router();

const emailController = require("../controllers/emailController");

router.get("/users/inbox", emailController.inbox);

module.exports = router;