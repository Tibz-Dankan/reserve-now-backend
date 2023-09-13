"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable("_bookings");
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.createTable("_bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      roomId: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
      },
      bookingStage: {
        type: Sequelize.ENUM(
          "selectBookingDates",
          "selectRoom",
          "selectPaymentOption"
        ),
        defaultValue: "selectBookingDates",
      },
      bookingStatus: {
        type: Sequelize.ENUM("confirmed", "cancelled", "pending"),
        defaultValue: "pending",
      },
      paymentStatus: {
        type: Sequelize.ENUM("paid", "unpaid"),
        defaultValue: "unpaid",
      },
      totalPrice: {
        type: Sequelize.INTEGER,
      },
      priceCurrency: {
        type: Sequelize.STRING,
      },
      specialRequests: {
        type: Sequelize.STRING,
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
};
