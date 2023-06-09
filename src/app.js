const express = require("express");
const dotenv = require("dotenv");

const app = express();

app.use(express.json());

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT + " 🚀");
});
