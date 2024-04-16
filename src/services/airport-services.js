const { Airportrespository } = require("../repositories");
const  AppErrors  = require("../utils");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/app-error");

const airportrespository = new Airportrespository();

async function createAirport(data) {
  try {
    const airport = await airportrespository.create(data);
    return airport;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppErrors(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppErrors(
      "cannot a create a new airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllAirports() {
  try {
    const airport = await airportrespository.getAll();
    return airport;
  } catch (error) {
    throw new AppErrors(
      "cannot fetch data of all airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirport(id) {
  try {
    const airport = await airportrespository.get(id);
    return airport;
  } catch (error) {
    if (error.StatusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("The airport is not present ", error.StatusCode);
    }
    throw new AppErrors(
      "cannot fetch data of the particular airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirport(id) {
  try {
    const airport = await airportrespository.destroy(id);
    return airport;
  } catch (error) {
    if (error.StatusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The airport is not delete for particular id  ", error.StatusCode);
      }
    throw new AppErrors(
      "cannot delete the airport of particular id",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirport(id , data) {
  try {
    const airport = await airportrespository.update(id , data);
    return airport;
  } catch (error) {
    if (error.StatusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The airport is not update for particular id  ", error.StatusCode);
      }
    throw new AppErrors(
      "cannot update the airport of particular id",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}


module.exports = {
  createAirport,
  getAllAirports,
  getAirport,
  destroyAirport,
  updateAirport
};
