const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.route("/").get(carController.getCarsData).post(carController.createCars);
router
  .route("/:id")
  .get(carController.getCarsById)
  .put(carController.updateCars)
  .delete(carController.deleteCars);

module.exports = router;
