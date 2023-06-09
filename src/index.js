const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const { app } = require("./app");

dotenv.config();

const startApp = async () => {
  const POSTGRES_URI = process.env.POSTGRES_URI;
  const PORT = 8000 || process.env.PORT;

  try {
    const sequelize = new Sequelize(POSTGRES_URI);

    await sequelize.authenticate();
    console.log("Database connection has been established successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  app.listen(PORT, () => {
    console.log("Server started and running on port: " + PORT + " 🚀");
  });
};

startApp();
