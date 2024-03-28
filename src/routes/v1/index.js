const express = require("express");
const { infoController } = require("../../controllers");
const airplaneRoutes  = require('./airplane-routes')

const router = express.Router();

router.use('/airplanes', airplaneRoutes)  // router.use for creating routing

router.get("/info", infoController.info); // there we are doing registration of routes and as well as bined with controller

module.exports = router;