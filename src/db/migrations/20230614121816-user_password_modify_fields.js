"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Users", "passwordResetToken", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Users", "passwordResetExpires", {
        type: Sequelize.DATE,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("Users", "passwordResetToken"),
      queryInterface.removeColumn("Users", "passwordResetExpires"),
    ]);
  },
};
