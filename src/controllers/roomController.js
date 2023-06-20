const Room = require("../models").Room;
const { AppError } = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");
const mime = require("mime-types");

const { Upload } = require("../utils/upload");
const path = require("path");

const addRoom = asyncHandler(async (req, res, next) => {
  const { roomNumber, roomType, capacity, price, priceCurrency } = req.body;

  if (!roomNumber || !roomType || !capacity || !price || !priceCurrency) {
    return next(new AppError("Please fill out all mandatory fields", 400));
  }
  const room = await Room.findOne({ where: { roomNumber: roomNumber } });

  if (room) return next(new AppError("Room already exits", 400));

  const newRoom = await Room.create(req.body);

  res.status(201).json({ success: true, data: newRoom });
});

const getAllRooms = asyncHandler(async (req, res, next) => {
  const rooms = await Room.findAll();

  res.status(200).json({ status: "success", data: rooms });
});

const getRoom = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("No room id supplied", 400));

  const room = await Room.findOne({ where: { id: id } });
  if (!room) return next(new AppError("No room found", 404));

  res.status(200).json({ status: "success", data: room });
});

const updateRoom = asyncHandler(async (req, res, next) => {
  const { roomNumber, roomType, capacity, price, priceCurrency } = req.body;
  const id = req.params.id;
  if (!id) return next(new AppError("No room id is supplied", 400));

  if (!roomNumber || !roomType || !capacity || !price || !priceCurrency) {
    return next(new AppError("Please fill out all mandatory fields", 400));
  }
  let room = await Room.findOne({ where: { id: id } });

  if (!room) {
    return next(new AppError("Room of supplied id doesn't exist", 404));
  }

  if (room.dataValues.roomNumber !== parseInt(roomNumber)) {
    room = await Room.findOne({ where: { roomNumber: roomNumber } });
    if (room) {
      return next(
        new AppError("Can't Update to already existing room number", 400)
      );
    }
  }
  room = await Room.update(req.body, { where: { id: id } });

  res.status(200).json({ status: "success", data: room });
});

const updateRoomImage = asyncHandler(async (req, res, next) => {
  console.log(req.file);

  const file = req.file;
  const id = req.params.id;
  if (!id) return next(new AppError("No room id is provided", 400));
  if (file == undefined) {
    return next(new AppError("Please provide a room image", 400));
  }

  const mimeType = mime.lookup(file.originalname);
  const isImage = mimeType && mimeType.startsWith("image");
  if (!isImage) return next(new AppError("Please file of image type", 400));

  const imagePath = `rooms/${Date.now()}_${file.originalname}`;
  const upload = await new Upload(imagePath, next).add(file);
  const url = upload.url;

  const updateImage = await Room.update(
    { imageUrl: url, imagePath: imagePath },
    { where: { id: id } }
  );

  res.status(200).json({ status: "success", data: updateImage });
});

module.exports = { addRoom, getAllRooms, getRoom, updateRoom, updateRoomImage };
