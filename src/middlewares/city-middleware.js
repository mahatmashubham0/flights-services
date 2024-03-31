const {StatusCodes} = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/app-error');

function validateCreateRequest(req,res,next) {
    if(!req.body.name){
        ErrorResponse.message = "please insert City name",
        ErrorResponse.error = new AppError("City Name is not found incomnig request",StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ErrorResponse})
    }
    next();
}

module.exports = {
    validateCreateRequest,
}