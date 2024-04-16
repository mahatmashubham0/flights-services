const express = require("express");

const { airportController } = require("../../controllers");
const { AirportMiddleware } = require("../../middlewares");

const router = express.Router();

//  /api/v1/airport   ---> POST
router.post("/", 
            AirportMiddleware.validateCreateRequest,
            airportController.createAirport);

router.get("/", airportController.getAllAirports);

router.get("/:id", airportController.getAirport);

router.delete("/:id", airportController.destroyAirport);

router.patch("/:id", airportController.updateAirport);


module.exports = router;
