"use strict";

const { hash, compare, genSalt } = require("bcryptjs");
const { createHash, randomBytes } = require("crypto");
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Booking, {
        foreignKey: "userId",
        as: "bookings",
      });
    }

    async correctPassword(password) {
      return await compare(password, this.password);
    }

    createPasswordResetToken() {
      console.log("Running create reset token");
      const resetToken = randomBytes(32).toString("hex");

      this.setDataValue(
        "passwordResetToken",
        createHash("sha256").update(resetToken).digest("hex")
      );
      this.setDataValue("passwordResetExpires", Date.now() + 20 * 60 * 1000);

      return resetToken;
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("user", "client", "staff", "admin"),
        defaultValue: "user",
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      passwordResetToken: {
        type: DataTypes.STRING,
      },
      passwordResetExpires: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  // Add hook to hash password before saving
  User.beforeSave(async (user, options) => {
    if (user.changed("password")) {
      const salt = await genSalt(10);
      const hashedPassword = await hash(user.password, salt);
      user.password = hashedPassword;
    }
  });

  return User;
};
