const { Logger } = require("../config");
const { StatusCodes } = require("http-status-codes");

const AppError = require("../utils/app-error");

class CrudRespository {
  constructor(model) {
    this.model = model;
  }
  
  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    if (!response) {
      // if id data is not present so destroy mthod give 0 and present so five 1 value inside the response variable
      throw new AppError("Not found the resourse", StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async get(id) {
    const response = await this.model.findByPk(id);
    if (!response) {
      // if id data is not present so findByPk mthod give null value inside the response variable
      throw new AppError("Not found the resourse", StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async getAll() {
    const response = await this.model.findAll();
    return response;
  }

  async update(id, data) {
    const response = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    return response;
  }
}

module.exports = CrudRespository;
