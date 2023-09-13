"use strict";
const { Sequelize, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BookedRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BookedRoom.belongsTo(models.Room, {
        foreignKey: `roomId`,
        as: "room",
      });
      BookedRoom.belongsTo(models.Booking, {
        foreignKey: `bookingId`,
        as: "booking",
      });
    }
  }

  BookedRoom.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "BookedRoom",
      tableName: "_booked_rooms",
    }
  );
  return BookedRoom;
};
