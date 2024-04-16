const { FlightRespository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/app-error");

const flightrespository = new FlightRespository();

async function createFlight(data) {
  try {
    const flight = await flightrespository.create(data);
    return flight;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "cannot a create a new flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlights() {
  try {
    const flight = await flightrespository.getAll();
    return flight;
  } catch (error) {
    throw new AppError(
      "cannot fetch data of all flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFlight(id) {
  try {
    const flight = await flightrespository.get(id);
    return flight;
  } catch (error) {
    if (error.StatusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("The flight is not present ", error.StatusCode);
    }
    throw new AppError(
      "cannot fetch data of the particular flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyFlight(id) {
  try {
    const flight = await flightrespository.destroy(id);
    return flight;
  } catch (error) {
    if (error.StatusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The flight is not delete for particular id  ", error.StatusCode);
      }
    throw new AppError(
      "cannot delete the flight of particular id",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateFlight(id , data) {
  try {
    const flight = await flightrespository.update(id , data);
    return flight;
  } catch (error) {
    if (error.StatusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The flight is not update for particular id  ", error.StatusCode);
      }
    throw new AppError(
      "cannot update the flight of particular id",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}


module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  destroyFlight,
  updateFlight
};
