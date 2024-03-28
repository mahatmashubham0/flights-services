const CrudRespository = require("./crud-repository");
const { Airplane } = require("../models");

class AirPlaneRespository extends CrudRespository {
  constructor() {
    super(Airplane);
  }
}

module.exports = AirPlaneRespository;
