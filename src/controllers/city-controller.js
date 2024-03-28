const { CityService } = require("../services");
const { StatusCodes } = require('http-status-codes');
const { SuccessRespone, ErrorResponse } = require("../utils/common");

/**
 * POST: /airplane
 * REQ-BODY: {name: ""
 */
async function createCity(req, res) {
    try {
      const city = await CityService.createCity({
        name: req.body.name,
      });
      SuccessRespone.data = city;
      return res.status(StatusCodes.CREATED).json({ SuccessRespone });
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.StatusCode).json({ ErrorResponse });
    }
  }

  module.exports = {
    createCity,
  };
  