const express = require("express");
const { addRoom, getAllRooms } = require("../../controllers/roomController");

const router = express.Router();

router.post("/api/rooms/add-room", addRoom);
router.get("/api/rooms/get-all-rooms", getAllRooms);

const roomRoutes = router;
module.exports = { roomRoutes };
