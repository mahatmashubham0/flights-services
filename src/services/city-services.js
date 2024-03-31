const { CityRespository } = require("../repositories");

const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/app-error");

const cityRespository = new CityRespository();

async function createCity(data) {
  try {
    const city = await cityRespository.create(data);
    return city;
  } catch (error) {
    console.log(error)
    if (error.name == "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "cannot a create a new city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteCity(id) {
  try {
    const city = await cityRespository.destroy(id);
    return city;
  } catch (error) {
    if (error.name == "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "cannot a destroy a new city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCity(id , data) {
  try {
    const city = await cityRespository.update(id , data);
    return city;
  } catch (error) {
    if (error.name == "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "cannot a destroy a new city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCity,
  deleteCity,
  updateCity
};
