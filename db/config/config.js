const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    url: `${process.env.POSTGRES_URL}`,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    url: `${process.env.CI_POSTGRES_URL}`,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    url: `${process.env.POSTGRES_URL}`,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
