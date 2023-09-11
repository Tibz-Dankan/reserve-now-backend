"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the "Bookings" table to "_bookings"
    await queryInterface.renameTable("Bookings", "_bookings");
  },

  down: async (queryInterface, Sequelize) => {
    // Rename the "_bookings" table back to "Bookings" if needed
    await queryInterface.renameTable("_bookings", "Bookings");
  },
};
