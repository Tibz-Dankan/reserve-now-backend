// Function to check if a table exists
const tableExists = async (sequelize, tableName) => {
  const query = `
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_name = '${tableName}'
        );
      `;

  try {
    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    const exists = result[0].exists;
    return exists == true;
  } catch (error) {
    console.log("Error checking table existence:", error);
    return false;
  }
};

const createTable = async (sequelize) => {
  (async () => {
    try {
      await sequelize.sync();
      console.log("Table created successfully");
    } catch (error) {
      console.log("Error creating table:", error);
    }
  })();
};

const dropTable = async (sequelize, table) => {
  await sequelize.query(`DROP TABLE IF EXISTS ${table}`);
};

const { Sequelize } = require("sequelize");
// const db = require("../models");
const dotenv = require("dotenv");
const { sequelize } = require("../models/index");

dotenv.config();

// let sequelize;
// const sequelize = db.sequelize;

// beforeAll(async () => {
//   //   const TEST_POSTGRES_URL = process.env.TEST_POSTGRES_URL;
//   //   sequelize = new Sequelize(TEST_POSTGRES_URL);

//   await sequelize.authenticate();
// //   await createTable(sequelize);
// });

const tables = Object.values(sequelize.models);

beforeAll(async () => {
  // await sequelize.sync({ force: true });

  tables.map(async (table) => {
    const exists = await tableExists(sequelize, table);

    if (!exists) {
      await createTable(sequelize);
    }
  });
});

beforeEach(async () => {
  // const tables = Object.values(sequelize.models);

  tables.map(async (table) => {
    table.destroy({ truncate: true });
  });
});

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

// Working script jest
// "db:reset": "npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate",
// "test": "cross-env NODE_ENV=test jest --testTimeout=10000",
// "pretest": "cross-env NODE_ENV=test npm run db:reset",
// "db:create:test": "cross-env NODE_ENV=test npx sequelize-cli db:create"
