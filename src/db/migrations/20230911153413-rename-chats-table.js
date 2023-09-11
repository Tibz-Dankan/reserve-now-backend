"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the "Chats" table to "_bookings"
    await queryInterface.renameTable("Chats", "_chats");
  },

  down: async (queryInterface, Sequelize) => {
    // Rename the "_chats" table back to "Chats" if needed
    await queryInterface.renameTable("_chats", "Chats");
  },
};
