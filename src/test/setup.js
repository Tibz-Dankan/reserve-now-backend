// const { Sequelize } = require("sequelize");
const db = require("../models");

// let sequelize;
const sequelize = db.sequelize;

// beforeAll(async () => {
//   //   const TEST_POSTGRES_URL = process.env.TEST_POSTGRES_URL;
//   //   sequelize = new Sequelize(TEST_POSTGRES_URL);

// //   await sequelize.authenticate();
// });

// beforeAll(async () => {
beforeEach(async () => {
  await sequelize.sync({ force: true });
});

// beforeEach(async () => {
//   const tables = Object.values(sequelize.models);

//   for (let table of tables) {
//     await table.destroy({ truncate: true, cascade: true });
//   }
// });

afterAll(async () => {
  await sequelize.close();
});

// package.json test config

// "jest": {
//     "verbose": true,
//     "testTimeout": 1000000,
//     "testEnvironment": "node",
//     "setupFilesAfterEnv": [
//       "./src/test/setup.js"
//     ]
//   },

// "scripts":{
//     "test": "jest --watchAll --no-cache --detectOpenHandles"
// }
