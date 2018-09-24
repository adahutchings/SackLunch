const express = require("express");
const router = express.Router();

const calendarController = require("../controllers/calendarController");

router.get("/calendar/month", calendarController.month);
router.get("/calendar/day", calendarController.day);

module.exports = router;

