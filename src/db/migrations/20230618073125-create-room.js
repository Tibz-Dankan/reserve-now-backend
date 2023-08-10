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
      roomName: {
        type: Sequelize.STRING,
      },
      roomType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      capacity: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      images: {
        type: Sequelize.JSONB,
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
        type: Sequelize.JSONB,
      },
      view: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      policy: {
        type: Sequelize.STRING,
      },
      additionalNotes: {
        type: Sequelize.TEXT,
      },
      publish: {
        type: Sequelize.JSONB,
        defaultValue: {
          isPublish: false,
          publishedAt: "",
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Rooms");
  },
};
