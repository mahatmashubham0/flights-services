const CrudRespository = require("./crud-repository");
const { Flight , Airplane } = require("../models");

class FlightRespository extends CrudRespository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter , sort) {
    const response = await Flight.findAll({
        where: filter,
        order: sort,
    })
    if (!response) {
        // if id data is not present so findByPk mthod give null value inside the response variable
        throw new AppError("Not found the resourse", StatusCodes.NOT_FOUND);
      }
    return response;
  }

}

module.exports = FlightRespository;
