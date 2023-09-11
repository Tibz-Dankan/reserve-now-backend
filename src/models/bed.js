"use strict";
const { Sequelize, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Bed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bed.belongsTo(models.Room, {
        foreignKey: `roomId`,
        as: "room",
      });
    }
  }

  Bed.init(
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
      bedType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Bed",
      tableName: "_beds",
    }
  );
  return Bed;
};
