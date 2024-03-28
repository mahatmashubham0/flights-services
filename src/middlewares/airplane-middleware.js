const {StatusCodes} = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/app-error');

function validateCreateRequest(req,res,next) {
    if(!req.body.modelNumber){
        ErrorResponse.message = "please insert ModelNumber",
        ErrorResponse.error = new AppError("Model Number is not found incomnig request",StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ErrorResponse})
    }
    next();
}

module.exports = {
    validateCreateRequest,
}