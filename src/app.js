const express = require("express");
const cors = require("cors");
const { userRoutes } = require("./routes/auth/userRoutes");
const { roomRoutes } = require("./routes/room/roomRoutes");
const { bookingRoutes } = require("./routes/booking/bookingRoutes");
const { errorController } = require("./controllers/errorController");
const logger = require("morgan");

const app = express();
let url;

if (process.env.NODE_ENV === "production") {
  app.use(cors({ origin: process.env.PRODUCTION_URL }));
  url = process.env.PRODUCTION_URL;
} else {
  app.use(cors());
  url = "http://localhost:5173";
}

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: url,
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/rooms", roomRoutes);
app.use("/api/v1/booking", bookingRoutes);
// chatHandler here

app.use(errorController);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "error end point not found!",
  });
});

module.exports = { server };
