const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const { server } = require("./app");

dotenv.config();

const startApp = async () => {
  const POSTGRES_URL = process.env.POSTGRES_URL;
  const PORT = 8000 || process.env.PORT;

  if (!POSTGRES_URL) {
    console.log("No postgres url");
    throw new Error("No postgres url");
  }

  try {
    const sequelize = new Sequelize(POSTGRES_URL);

    await sequelize.authenticate();
    console.log("Database connection has been established successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  server.listen(PORT, () => {
    console.log("Server started and running on port: " + PORT + " 🚀");
  });
};

startApp();
