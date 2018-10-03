const express = require("express");
const router = express.Router();
const mealOptionsController = require("../controllers/mealOptionsController");

router.get("/mealOptions/mealEntry", mealOptionsController.mealEntry);
router.get("/mealOptions/order", mealOptionsController.newOrder);
router.post("/mealOptions/create", mealOptionsController.createMeal);
router.post("/mealOrder/newOrder", mealOptionsController.orderMeal);


module.exports = router;