const { FlightService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessRespone, ErrorResponse } = require("../utils/common");

async function getAllFlightsOnFilter(req, res) {
  try {
    const flights = await FlightService.getAllFlightsOnfilter(req.query);
    SuccessRespone.data = flights;
    return res.status(StatusCodes.OK).json({ SuccessRespone });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json({ ErrorResponse });
  }
}
