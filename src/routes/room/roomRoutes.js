const express = require("express");
const {
  addRoom,
  getAllRooms,
  searchRooms,
  getRoom,
  updateRoom,
  updateRoomImage,
} = require("../../controllers/roomController");
const { protect } = require("../../controllers/userController");
const { uploadFile } = require("../../utils/upload");

const router = express.Router();

router.post("/add-room", protect, addRoom);
router.get("/get-all-rooms", getAllRooms);
router.get("/search-rooms", searchRooms);
router.get("/get-room/:id", getRoom);
router.patch("/update-room/:id", protect, updateRoom);
router.patch("/update-room-image/:id", uploadFile, protect, updateRoomImage);

const roomRoutes = router;
module.exports = { roomRoutes };
