"use strict";
const { Sequelize, Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.Room, {
        foreignKey: "roomId",
        as: "room",
      });

      Booking.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      // TODO: To define a one2one association btn booking and payment
    }
  }
  Booking.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      roomId: {
        type: DataTypes.INTEGER,
      },
      paymentId: {
        type: DataTypes.INTEGER,
      },
      checkInDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      numOfGuests: {
        //TODO: Desired format {adults: 2, children:2 childAge:[child1:"2", child2:"12"]}
        type: DataTypes.INTEGER, //To change the type to jsonb
      },
      bookingStage: {
        //TO be removed
        type: DataTypes.ENUM(
          "selectBookingDates",
          "selectRoom",
          "selectPaymentOption"
        ),
        defaultValue: "selectBookingDates",
      },
      bookingStatus: {
        type: DataTypes.ENUM("confirmed", "cancelled", "pending"),
        defaultValue: "pending",
      },
      paymentStatus: {
        type: DataTypes.ENUM("paid", "unpaid"),
        defaultValue: "unpaid",
      },
      totalPrice: {
        type: DataTypes.INTEGER,
      },
      priceCurrency: {
        type: DataTypes.STRING,
      },
      specialRequests: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      sequelize,
      modelName: "Booking",
      tableName: "_bookings",
    }
  );
  return Booking;
};
