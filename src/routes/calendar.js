const express = require("express");
const router = express.Router();
const calendarController = require("../controllers/calendarController");

//router.get("/calendar/day", calendarController.day);
router.get("/calendar/day/:id", calendarController.showDay);
router.get("/calendar/month", calendarController.month);


module.exports = router;