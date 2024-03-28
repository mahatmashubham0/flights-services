const CrudRespository = require("./crud-repository");
const { City } = require("../models");

class CityRespository extends CrudRespository  {
  constructor() {
    super(City);
  }
}

module.exports = CityRespository;
