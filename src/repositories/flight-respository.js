const CrudRespository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");
const { Sequelize } = require("sequelize");

class FlightRespository extends CrudRespository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {        // as we know flight associtad with the airplane  , departuredId and arrivalId using include 
                                            //  property we can get associated data and if associated data associated with another data 
                                            // so we use nested include. example jaise flight associated hai airplane  , departuredId and arrivalId
                                            // and departureId associated and with cityId se to hum data get kr skte hai nested include se
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane, // by deafult airplane give data of primary key column in airplane table
          required: true,
          as: "airplaneDetails", // it is used for giving a name
        },
        {
          model: Airport, // yha pr hume btaya h ki airport table me primary ki ki tarah code column kaam kr rha hain
          required: true,
          as: "departureAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
        {
          model: Airport,
          required: true,
          as: "arrivalAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
      ],
    });
    if (!response) {
      // if id data is not present so findByPk mthod give null value inside the response variable
      throw new AppError("Not found the resourse", StatusCodes.NOT_FOUND);
    }
    return response;
  }
}

module.exports = FlightRespository;
