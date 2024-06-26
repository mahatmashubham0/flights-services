const express = require("express");
const { infoController } = require("../../controllers");
const airplaneRoutes  = require('./airplane-routes')
const cityRoutes  = require('./city-routes')
const airportRoutes = require('./airport-router')
const flightRoutes = require('./flight-router')

const router = express.Router();

router.use('/airplanes', airplaneRoutes)  // router.use for creating routing

router.use('/cities' , cityRoutes)

router.use('/airport' , airportRoutes)

router.use('/flight' , flightRoutes)

// router.use()

router.get("/info", infoController.info); // there we are doing registration of routes and as well as bined with controller



module.exports = router;
