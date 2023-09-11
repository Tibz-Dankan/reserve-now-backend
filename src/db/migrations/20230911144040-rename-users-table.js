"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the "Users" table to "_users"
    await queryInterface.renameTable("Users", "_users");
  },

  down: async (queryInterface, Sequelize) => {
    // Rename the "_users" table back to "Users" if needed
    await queryInterface.renameTable("_users", "Users");
  },
};
