'use strict';
/** @type {import('sequelize-cli').Migration} */

const {Enum} = require('../utils/common')
const {BUSINESS , PREMIUM , FIRST , ECONOMY} = Enum.Enums

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Airplanes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      col: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: [BUSINESS , PREMIUM , ECONOMY , FIRST],
        defaultValue: ECONOMY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seats');
  }
};