const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessRespone, ErrorResponse } = require("../utils/common");
/**
 * POST: /airplane
 * REQ-BODY: {modelNUmber: sirbus452, capacity: 520}
 */
async function createAirPlane(req, res) {
  try {
    const airplane = await AirplaneService.createAirPlane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessRespone.data = airplane;
    return res.status(StatusCodes.CREATED).json({ SuccessRespone });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json({ ErrorResponse });
  }
}

/**
 * GET: /airplane
 */
async function getAllAirplanes(req, res) {
  try {
    const airplanes = await AirplaneService.getAllAirplanes();
    SuccessRespone.data = airplanes;
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
async function getAirplane(req, res) {
  try {
    const airplane = await AirplaneService.getAirplane(req.params.id);
    SuccessRespone.data = airplane;
    return res.status(StatusCodes.OK).json({ SuccessRespone });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json({ ErrorResponse });
  }
}

async function destroyAirplane(req, res) {
  try {
    const airplane = await AirplaneService.destroyAirplane(req.params.id);
    SuccessRespone.data = airplane;
    return res.status(StatusCodes.OK).json({ SuccessRespone });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json({ ErrorResponse });
  }
}

async function updateAirplane(req, res) {
  try {
    const airplane = await AirplaneService.updateAirplane(req.params.id,
    {capacity: req.body.capacity}
    );
    SuccessRespone.data = airplane;
    return res.status(StatusCodes.OK).json({ SuccessRespone });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json({ ErrorResponse });
  }
}

module.exports = {
  createAirPlane,
  getAllAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane
};
