const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

global.signin = function () {
  return new Promise((resolve, reject) => {
    resolve([]);
  });
};

let sequelize;

beforeAll(async () => {
  const TEST_POSTGRES_URL = process.env.TEST_POSTGRES_URL;
  sequelize = new Sequelize(TEST_POSTGRES_URL);

  await sequelize.authenticate();
});

beforeEach(async () => {
  const tables = Object.values(sequelize.models);

  for (let table of tables) {
    await table.destroy({ truncate: true, cascade: true });
  }
});

afterAll(async () => {
  await sequelize.close();
});
