const {StatusCodes} = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/app-error');

function validateCreateRequest(req,res,next) {
    if(!req.body.name){
        ErrorResponse.message = "please insert name",
        ErrorResponse.error = new AppError("airport name is not found incomnig request",StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ErrorResponse})
    }
    if(!req.body.code){
        ErrorResponse.message = "please insert code",
        ErrorResponse.error = new AppError("airport code is not found incomnig request",StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ErrorResponse})
    }
    if(!req.body.cityId){
        ErrorResponse.message = "please insert cityId",
        ErrorResponse.error = new AppError("airport cityId is not found incomnig request",StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ErrorResponse})
    }
    if(!req.body.address){
        ErrorResponse.message = "please insert address",
        ErrorResponse.error = new AppError("airport address is not found incomnig request",StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ErrorResponse})
    }
    next();
}

module.exports = {
    validateCreateRequest,
}