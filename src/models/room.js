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
      Room.hasMany(models.Booking, {
        foreignKey: "roomId",
        as: "bookings",
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
      roomName: {
        type: DataTypes.STRING,
      },
      roomType: {
        type: DataTypes.STRING, //single, double, suite, deluxe, etc
        allowNull: false,
      },
      capacity: {
        type: DataTypes.JSONB, // format { adults: 2, children: 1 }
        allowNull: false,
      },
      images: {
        type: DataTypes.JSONB, // format [{ viewType: "", url: "", path: "" }]
        defaultValue: [
          { viewType: "interior", url: "", path: "", createdAt: "" },
          { viewType: "exterior", url: "", path: "", createdAt: "" },
          { viewType: "bathroom", url: "", path: "", createdAt: "" },
        ],
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
        type: DataTypes.JSONB,
      },
      view: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.JSONB, //format {amount:50, currency:"US dollar" }
        allowNull: false,
      },
      policy: {
        type: DataTypes.STRING,
      },
      additionalNotes: {
        type: DataTypes.TEXT,
      },
      publish: {
        type: DataTypes.JSONB,
        defaultValue: {
          isPublished: false,
          publishedAt: "",
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Room",
      tableName: "_rooms",
    }
  );
  return Room;
};
