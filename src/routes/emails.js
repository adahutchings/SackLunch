const express = require("express");
const router = express.Router();

const emailController = require("../controllers/emailController");

router.get("/emails/inbox", emailController.inbox);
router.get("/emails/sent", emailController.sent);
router.get("/emails/new", emailController.new);
router.get("/emails/adminNew", emailController.adminNew);
router.get("/emails/:id", emailController.show);
router.post("/emails/create", emailController.create);
router.post("/emails/adminCreate", emailController.adminCreate);
router.post("/emails/:id/destroy", emailController.destroy);

module.exports = router;