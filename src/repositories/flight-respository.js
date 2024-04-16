const CrudRespository = require("./crud-repository");
const { Flight } = require("../models");

class FlightRespository extends CrudRespository {
  constructor() {
    super(Flight);
  }
}

module.exports = FlightRespository;
