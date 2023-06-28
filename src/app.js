const express = require("express");
const cors = require("cors");
const { userRoutes } = require("./routes/auth/userRoutes");
const { roomRoutes } = require("./routes/room/roomRoutes");
const { bookingRoutes } = require("./routes/booking/bookingRoutes");
const { errorController } = require("./controllers/errorController");
const logger = require("morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use(cors());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/rooms", roomRoutes);
app.use("/api/v1/booking", bookingRoutes);

app.use(errorController);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "error end point not found!",
  });
});

module.exports = { app };
