const { sequelize } = require("../models/index");

beforeAll(async () => {
  try {
    await sequelize.authenticate();
  } catch (err) {
    console.log("Unable to connect to test db due to: ", err);
  }
});

beforeEach(async () => {
  const tables = Object.values(sequelize.models);

  tables.map(async (table) => {
    table.destroy({ truncate: true });
  });
});

afterAll(async () => {
  await sequelize.close();
});
