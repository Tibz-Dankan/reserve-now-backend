const express = require("express");
const cors = require("cors");
const { userRoutes } = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/v1", userRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "error end point not found!",
  });
});

module.exports = { app };
