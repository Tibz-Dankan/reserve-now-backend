"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("_bookings", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      paymentId: {
        type: Sequelize.INTEGER,
      },
      checkInDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      checkOutDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      numOfGuests: {
        type: Sequelize.JSONB, //format {adults: 2, children:2 childrenAge:[child1:"2", child2:"12"]}
        allowNull: false,
      },
      bookingStatus: {
        type: Sequelize.ENUM("confirmed", "cancelled", "pending"),
        defaultValue: "pending",
      },
      paymentStatus: {
        type: Sequelize.ENUM("paid", "unpaid"),
        defaultValue: "unpaid",
      },
      price: {
        type: Sequelize.JSONB, //format {total: 2, currency:"USD"}
      },
      specialRequests: {
        type: Sequelize.STRING,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("_bookings");
  },
};
