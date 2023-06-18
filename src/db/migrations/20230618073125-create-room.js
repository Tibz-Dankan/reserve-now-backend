"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      roomNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      roomType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      occupancyStatus: {
        type: Sequelize.ENUM(
          "vacant",
          "occupied",
          "undergoing cleaning/maintenance"
        ),
        defaultValue: "vacant",
      },
      amenities: {
        type: Sequelize.STRING,
      },
      View: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      priceCurrency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      policy: {
        type: Sequelize.STRING,
      },
      additionalNotes: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Rooms");
  },
};
