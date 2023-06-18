"use strict";
const { Sequelize, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.hasMany(models.Bed, {
        foreignKey: `roomId`,
        as: "beds",
      });
    }
  }

  Room.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      roomType: {
        type: DataTypes.STRING, //single, double, suite, deluxe, etc
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      occupancyStatus: {
        type: DataTypes.ENUM(
          "vacant",
          "occupied",
          "undergoing cleaning/maintenance"
        ),
        defaultValue: "vacant",
      },
      amenities: {
        type: DataTypes.STRING,
      },
      View: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      priceCurrency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      policy: {
        type: DataTypes.STRING,
      },
      additionalNotes: {
        type: DataTypes.TEXT,
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
      modelName: "Room",
    }
  );
  return Room;
};
