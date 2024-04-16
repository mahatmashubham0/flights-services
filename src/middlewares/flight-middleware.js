const {StatusCodes} = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/app-error');

function validateCreateRequest(req,res,next) {
    if(!req.body.flightNumber){
        ErrorResponse.message = "please insert flightNumber",
        ErrorResponse.error = new AppError("flight flightNumber is not found incomnig request",StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ErrorResponse})
    }
    if(!req.body.airPlaneId){
        ErrorResponse.message = "please insert airPlaneId",
        ErrorResponse.error = new AppError("airPlaneId is not found incomnig request",StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ErrorResponse})
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message = "please insert departureAirportId",
        ErrorResponse.error = new AppError("flight departureAirportId is not found incomnig request",StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ErrorResponse})
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message = "please insert arrivalAirportId",
        ErrorResponse.error = new AppError("flight departureAirportId is not found incomnig request",StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ErrorResponse})
    }
    if(!req.body.departureTime){
        ErrorResponse.message = "please insert departureTime",
        ErrorResponse.error = new AppError("flight departureTime is not found incomnig request",StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ErrorResponse})
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message = "please insert arrivalTime",
        ErrorResponse.error = new AppError("flight arrivalTime is not found incomnig request",StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ErrorResponse})
    }
    if(!req.body.price){
        ErrorResponse.message = "please insert price",
        ErrorResponse.error = new AppError("flight price is not found incomnig request",StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ErrorResponse})
    }
    if(!req.body.totalseats){
        ErrorResponse.message = "please insert totalseats",
        ErrorResponse.error = new AppError("flight totalseats is not found incomnig request",StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ErrorResponse})
    }
    next();
}

module.exports = {
    validateCreateRequest,
}