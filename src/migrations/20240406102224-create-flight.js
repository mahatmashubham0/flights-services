'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      flightNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      airPlaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Airplanes',
          field: 'id',
        },
        onDelete: 'CASCADE',
      },
      departureAirportId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Airports',
          field: 'code',
        },
        onDelete: 'CASCADE',
      },
      arrivalAirportId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Airports',
          field: 'code',
        },
        onDelete: 'CASCADE',
      },
      departureTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      arrivalTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      boardingGate: {
        type: Sequelize.INTEGER
      },
      totalseats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  }
};