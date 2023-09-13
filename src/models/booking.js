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
      Booking.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Booking.hasMany(models.BookedRoom, {
        foreignKey: "bookingId",
        as: "bookedRooms",
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
        type: DataTypes.JSONB, //format {adults: 2, children:2 childrenAge:[child1:"2", child2:"12"]}
        allowNull: false,
      },
      bookingStatus: {
        type: DataTypes.ENUM("confirmed", "cancelled", "pending"),
        defaultValue: "pending",
      },
      paymentStatus: {
        type: DataTypes.ENUM("paid", "unpaid"),
        defaultValue: "unpaid",
      },
      price: {
        type: DataTypes.JSONB, //format {total: 2, currency:"USD"}
      },
      specialRequests: {
        type: DataTypes.STRING,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Booking",
      tableName: "_bookings",
    }
  );
  return Booking;
};
