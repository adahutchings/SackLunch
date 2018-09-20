const express = require("express");
const router = express.Router();

const calendarController = require("../controllers/calendarController");

router.get("/calendar/month", calendarController.month);

module.exports = router;

