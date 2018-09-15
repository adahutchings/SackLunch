const express = require("express");
const router = express.Router();

const emailController = require("../controllers/emailController");

router.get("/emails/inbox", emailController.inbox);
router.get("/emails/new", emailController.new);
router.get("/emails/:id", emailController.show);
router.post("/emails/create", emailController.create);

module.exports = router;