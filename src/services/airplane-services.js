const { AirPlaneRespository } = require("../repositories");
const { AppErrors } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/app-error");

const airplanerespository = new AirPlaneRespository();

async function createAirPlane(data) {
  try {
    const airplane = await airplanerespository.create(data);
    return airplane;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppErrors(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppErrors(
      "cannot a create a new airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllAirplanes() {
  try {
    const airplane = await airplanerespository.getAll();
    return airplane;
  } catch (error) {
    throw new AppErrors(
      "cannot fetch data of all airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const airplane = await airplanerespository.get(id);
    return airplane;
  } catch (error) {
    console.log(error.explaination)
    if (error.StatusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("The airplane is not present", error.StatusCode);
    }
    throw new AppErrors(
      "cannot fetch data of the particular airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// So using throw statement Error come < airplanerespository.get(id); > on this part and according the try catch if Error occur so Catch part will be
// execute and according error stiuation again Error Class will be updated and and throw error to the Controller part

async function destroyAirplane(id) {
  try {
    const airplane = await airplanerespository.destroy(id);
    return airplane;
  } catch (error) {
    if (error.StatusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The airplane is not delete for particular id  ", error.StatusCode);
      }
    throw new AppErrors(
      "cannot delete the airplane of particular id",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirplane(id , data) {
  try {
    const airplane = await airplanerespository.update(id , data);
    return airplane;
  } catch (error) {
    if (error.StatusCode === StatusCodes.NOT_FOUND) {
        throw new AppError("The airplane is not update for particular id  ", error.StatusCode);
      }
    throw new AppErrors(
      "cannot update the airplane of particular id",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}


module.exports = {
  createAirPlane,
  getAllAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane
};
