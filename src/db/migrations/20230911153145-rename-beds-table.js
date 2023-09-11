"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the "Beds" table to "_bookings"
    await queryInterface.renameTable("Beds", "_beds");
  },

  down: async (queryInterface, Sequelize) => {
    // Rename the "_beds" table back to "Beds" if needed
    await queryInterface.renameTable("_beds", "Beds");
  },
};
