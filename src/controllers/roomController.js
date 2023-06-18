const Room = require("../models").Room;
const { AppError } = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");

const addRoom = asyncHandler(async (req, res, next) => {
  const { roomNumber, roomType, capacity, price, priceCurrency } = req.body;

  if (!roomNumber || !roomType || !capacity || !price || !priceCurrency) {
    return next(new AppError("Please fill out all mandatory fields", 400));
  }
  const room = await Room.findOne({ where: { roomNumber: roomNumber } });

  if (room) return next(new AppError("Room already exits", 400));

  const newRoom = await Room.create(req.body);

  res.status(200).json({ success: true, data: newRoom });
});

const getAllRooms = asyncHandler(async (req, res, next) => {
  const rooms = await Room.findAll();

  res.status(200).json({ success: true, data: rooms });
});

module.exports = { addRoom, getAllRooms };
