const express = require("express");
const cors = require("cors");
const { userRoutes } = require("./routes/auth/userRoutes");
const { roomRoutes } = require("./routes/room/roomRoutes");
const logger = require("morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

app.use(cors());

app.use("/v1", userRoutes);
app.use("/v1", roomRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "error end point not found!",
  });
});

module.exports = { app };
