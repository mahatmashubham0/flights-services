const { AirportService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessRespone, ErrorResponse } = require("../utils/common");
/**
 * POST: /airport
 * REQ-BODY: {name: req.body.name,   code: req.body.code,      address: req.body.address,      cityId: req.body.cityId,}
 */
async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });
    SuccessRespone.data = airport;
    return res.status(StatusCodes.CREATED).json({ SuccessRespone });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json({ ErrorResponse });
  }
}

/**
 * GET: /airplane
 */
async function getAllAirports(req, res) {
  try {
    const airport = await AirportService.getAllAirports();
    SuccessRespone.data = airport;
    return res.status(StatusCodes.OK).json({ SuccessRespone });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json({ ErrorResponse });
  }
}

/**
 * POST: /airplane/:id
 * REQ-BODY: {REQ.PARAMS.ID}
 */
async function getAirport(req, res) {
  try {
    const airport = await AirportService.getAirport(req.params.id);
    SuccessRespone.data = airport;
    return res.status(StatusCodes.OK).json({ SuccessRespone });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json({ ErrorResponse });
  }
}

async function destroyAirport(req, res) {
  try {
    const airport = await AirportService.destroyAirport(req.params.id);
    SuccessRespone.data = airport;
    return res.status(StatusCodes.OK).json({ SuccessRespone });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json({ ErrorResponse });
  }
}

async function updateAirport(req, res) {
  try {
    const airport = await AirportService.updateAirport(req.params.id, {
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });
    SuccessRespone.data = airport;
    return res.status(StatusCodes.OK).json({ SuccessRespone });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json({ ErrorResponse });
  }
}

module.exports = {
  createAirport,
  getAllAirports,
  getAirport,
  destroyAirport,
  updateAirport,
};
