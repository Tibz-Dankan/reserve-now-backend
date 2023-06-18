const express = require("express");
const { addRoom } = require("../../controllers/roomController");

const router = express.Router();

router.post("/api/rooms/add-room", addRoom);

const roomRoutes = router;
module.exports = { roomRoutes };
