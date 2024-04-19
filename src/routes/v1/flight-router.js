const express = require("express");

const { flightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middlewares");

const router = express.Router();

//  /api/v1/airport   ---> POST
router.post("/", 
            FlightMiddleware.validateCreateRequest,
            flightController.createFlight);

router.get("/", flightController.getAllFlights);

router.get("/:id", flightController.getFlight);

router.delete("/:id", flightController.destroyFlight);

router.patch("/:id", flightController.updateFlight);

// Filter api
// router.get('/' , flightController.getAllFlightsOnFilter)


module.exports = router;
