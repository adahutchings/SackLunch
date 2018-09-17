const express = require("express");
const router = express.Router();

const childController = require("../controllers/childController");

router.get("/child", childController.all);
router.get("/child/new", childController.new);
router.get("/child/:id/edit", childController.edit);
router.post("/child/create", childController.create);
router.post("/child/:id/update", childController.update);
router.post("/child/:id/destroy", childController.destroy);


module.exports = router;