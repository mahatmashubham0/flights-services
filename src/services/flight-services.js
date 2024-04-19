const { FlightRespository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/app-error");
const {Op} = require('sequelize')

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

async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = [];
  const endingTripTime = " 23:59:00"

  // trips = HYB-MUB
  if(query.trips) {
    [departureAirportId , arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
    // and Check both airport are not same
  }

  // price = 2500-4500
  if(query.price) {
    [minPrice , maxPrice] = query.price.split("-");
    console.log(minPrice , maxPrice)
    customFilter.price = {
      [Op.between]: [minPrice , ((maxPrice === undefined) ? 20000 : maxPrice)]
    }
  }

  // travellers is equal and grater than the available seata in flights database there totalseat means available seats
  // travellers = 2
  if(query.travellers) {
    customFilter.totalSeats = {  // Op.gte aesa symbol h jise us se equal and jhadha value ko filter krta hain
        [Op.gte]: query.travellers  // it means totalSeats me query,travellers se equal and jhadha value ho
    }
}

  // tripDate = 2024-04-15
  if(query.tripDate) {
    customFilter.departureTime = {
        [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
    }
  }

  // sort = 
  if(query.sort) {
    const params = query.sort.split(',');
    const sortFilters = params.map((param) => param.split('_'));
    sortFilter = sortFilters
   }
   console.log(customFilter, sortFilter);

  try {
    const flights = flightrespository.getAllFlights(customFilter , sortFilter);
    return flights;
  } catch (error) {
    if (error.StatusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("The flight is not present for according this filter", error.StatusCode);
    }
    throw new AppError(
      "Con not find data according the currespoding filter ",
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

// async function getAllFlightsOnfilter(query) {
//   const customFilter = {};
//   // trips = HYB-MUB
//   if(query.trips) {
//     [departureAirportId , arrivalAirportId] = query.trips.split("-");
//     customFilter.departureAirportId = departureAirportId;
//     customFilter.arrivalAirportId = arrivalAirportId;
//     // and Check both airport are not same
//   }
//   try {
//     const flights = flightrespository.getAllFlights(customFilter);
//     return flights;
//   } catch (error) {
//     throw new AppError("Con not find data according the currespoding filter ", StatusCodes.INTERNAL_SERVER_ERROR);
//   }
// }


module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  destroyFlight,
  updateFlight,
  // getAllFlightsOnfilter
};
