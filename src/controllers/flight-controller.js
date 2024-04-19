const { FlightService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessRespone, ErrorResponse } = require("../utils/common");
/**
 * POST: /airplane
 * REQ-BODY: {
 * flightNumber : 'UK 808',
 * airPlaneId: "a308",
 * departureAirportId: "12",
 * arrivalAirportId: "11",
 * departureTime: "11:10:00".
 * arrivalTime: "12:00:00",
 * price: 2000
 * boardingGate: '12A',
 * totalseats: 120
 * }
 */
async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airPlaneId: req.body.airPlaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      departureTime: req.body.departureTime,
      arrivalTime: req.body.arrivalTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalseats: req.body.totalseats
    });
    SuccessRespone.data = flight;
    return res.status(StatusCodes.CREATED).json({ SuccessRespone });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json({ ErrorResponse });
  }
}

/**
 * GET: /airplane
 */
async function getAllFlights(req, res) {
  try {
    const flights = await FlightService.getAllFlights(req.query);
    SuccessRespone.data = flights;
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
async function getFlight(req, res) {
  try {
    const flight = await FlightService.getFlight(req.params.id);
    SuccessRespone.data = flight;
    return res.status(StatusCodes.OK).json({ SuccessRespone });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json({ ErrorResponse });
  }
}

// Again using throw Error come < AirplaneService.getAirplane(req.params.id); > on this part and according the try catch if Error occur so Catch part will be
// execute and inside the catch ErrorResponse object will be updated and now return the Error on the display using res.send() method

async function destroyFlight(req, res) {
  try {
    const flight = await FlightService.destroyFlight(req.params.id);
    SuccessRespone.data = flight;
    return res.status(StatusCodes.OK).json({ SuccessRespone });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json({ ErrorResponse });
  }
}

async function updateFlight(req, res) {
  try {
    const flight = await FlightService.updateFlight(req.params.id,
    {capacity: req.body.capacity}
    );
    SuccessRespone.data = flight;
    return res.status(StatusCodes.OK).json({ SuccessRespone });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json({ ErrorResponse });
  }
}

// async function getAllFlightsOnFilter(req, res) {
//   try {
//     const flights = await FlightService.getAllFlightsOnfilter(req.query);
//       SuccessRespone.data = flights;
//       return res.status(StatusCodes.OK).json({ SuccessRespone });
//   } catch (error) {
//     ErrorResponse.error = error;
//     return res.status(error.StatusCode).json({ ErrorResponse });
//   }
// }

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  destroyFlight,
  updateFlight,
  // getAllFlightsOnFilter
};
