const express = require("express");
const router = express.Router();
const mealOptionsController = require("../controllers/mealOptionsController");

router.get("/mealOptions/mealEntry", mealOptionsController.mealEntry);
router.post("/mealOptions/create", mealOptionsController.createMeal);
router.post("/mealOptions/newOrder", mealOptionsController.orderMeal);


module.exports = router;