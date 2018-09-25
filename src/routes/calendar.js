const express = require("express");
const router = express.Router();

router.get("/calendar/day/", calendarController.day);

module.exports = router;