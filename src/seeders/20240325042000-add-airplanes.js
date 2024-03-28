'use strict';

const {Op} = require("sequelize")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('airplanes',[
      {
        modelNumber: 'abc452',
        capacity: 254,
        createdAT: new Date(),
        updatedAT: new Date()
      },
      {
        modelNumber: 'xyz123',
        capacity: 584,
        createdAT: new Date(),
        updatedAT: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('airplanes',
    {[Op.or]:
      [{modelNumber: 'xyz123'},{modelNumber: 'abc452'}]
    }
    )
  }
};
