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
      },
      roomId: {
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
        type: DataTypes.INTEGER,
      },
      bookingStatus: {
        type: DataTypes.ENUM("confirmed", "cancelled", "pending"),
        defaultValue: "pending",
      },
      paymentStatus: {
        type: DataTypes.ENUM("paid", "unpaid"),
        defaultValue: "unpaid",
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
    }
  );
  return Booking;
};
