const express = require("express");
const {
  addRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
} = require("../../controllers/roomController");

const router = express.Router();

router.post("/api/rooms/add-room", addRoom);
router.get("/api/rooms/get-all-rooms", getAllRooms);
router.get("/api/rooms/get-room/:id", getRoomById);
router.patch("/api/rooms/update-room/:id", updateRoom);

const roomRoutes = router;
module.exports = { roomRoutes };
