const express = require("express");
const {
  addRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  updateRoomImage,
} = require("../../controllers/roomController");
const { uploadFile } = require("../../utils/upload");

const router = express.Router();

router.post("/api/rooms/add-room", addRoom);
router.get("/api/rooms/get-all-rooms", getAllRooms);
router.get("/api/rooms/get-room/:id", getRoom);
router.patch("/api/rooms/update-room/:id", updateRoom);
router.patch("/api/rooms/update-room-image/:id", uploadFile, updateRoomImage);

const roomRoutes = router;
module.exports = { roomRoutes };
