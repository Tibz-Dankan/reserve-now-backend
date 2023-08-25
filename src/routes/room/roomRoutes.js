const express = require("express");
const {
  addRoomBasicInfo,
  getAllRooms,
  searchRooms,
  getRoom,
  updateRoomBasicInfo,
  addRoomImage,
  updateRoomImage,
  publishRoom,
  unPublishRoom,
  deleteRoom,
} = require("../../controllers/roomController");
const { protect } = require("../../controllers/userController");
const { uploadFile } = require("../../utils/upload");

const router = express.Router();

router.post("/add-room", protect, addRoomBasicInfo);
router.get("/get-all-rooms", getAllRooms);
router.get("/search-rooms", searchRooms);
router.get("/get-room/:id", getRoom);
router.patch("/update-room/:id", protect, updateRoomBasicInfo);
router.post("/add-room-image/:id", uploadFile, protect, addRoomImage);
router.patch("/update-room-image/:id", uploadFile, protect, updateRoomImage);
router.patch("/publish-room/:id", protect, publishRoom);
router.patch("/unpublish-room/:id", protect, unPublishRoom);
router.delete("/delete-room/:id", protect, deleteRoom);

const roomRoutes = router;
module.exports = { roomRoutes };
