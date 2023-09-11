"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the "Rooms" table to "_rooms"
    await queryInterface.renameTable("Rooms", "_rooms");
  },

  down: async (queryInterface, Sequelize) => {
    // Rename the "_rooms" table back to "Rooms" if needed
    await queryInterface.renameTable("_rooms", "Rooms");
  },
};
