const { StatusCodes } = require("http-status-codes");

const infoData = (req, res) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Send data Successfully",
    error: {},
    data: {},
  });
};

const info = (req, res) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "try Again",
    error: {},
    data: {},
  });
};

module.exports = {
  infoData,
  info
}
