const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    url: `${process.env.POSTGRES_URL}`,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
    logging: false,
  },
  test: {
    url: `${process.env.TEST_POSTGRES_URL}`,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        require: true,
      },
    },
    logging: false,
  },
  production: {
    url: `${process.env.POSTGRES_URL}`,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        require: true,
      },
    },
  },
};
