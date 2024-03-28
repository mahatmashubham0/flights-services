const express = require("express");

const { airplaneController } = require("../../controllers");
const { AirPlaneMiddleware } = require("../../middlewares");

const router = express.Router();

//  /api/v1/airplanes   ---> POST
router.post("/", 
            AirPlaneMiddleware.validateCreateRequest,
            airplaneController.createAirPlane);

router.get("/", airplaneController.getAllAirplanes);

router.get("/:id", airplaneController.getAirplane);

router.delete("/:id", airplaneController.destroyAirplane);

router.patch("/:id", airplaneController.updateAirplane);


module.exports = router;
