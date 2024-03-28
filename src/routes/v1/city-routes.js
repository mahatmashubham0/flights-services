const express = require("express");

const { cityController } = require("../../controllers");
// const { AirPlaneMiddleware } = require("../../middlewares");

const router = express.Router();

router.post("/", cityController.createCity);



module.exports = router;