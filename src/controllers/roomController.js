const Room = require("../models").Room;
const Bed = require("../models").Bed;

const { AppError } = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");
const mime = require("mime-types");

const { Upload } = require("../utils/upload");
const path = require("path");

const addRoomBasicInfo = asyncHandler(async (req, res, next) => {
  const { roomType, roomName, capacity, price } = req.body;

  if (!roomName || !roomType || !capacity || !price) {
    return next(new AppError("Please fill out all mandatory fields", 400));
  }
  const hasPriceProperties = ["amount", "currency"].every((property) =>
    price.hasOwnProperty(property)
  );
  if (!hasPriceProperties || !price.amount || !price.currency) {
    return next(
      new AppError("Please provide the price amount and currency", 400)
    );
  }
  const hasCapacityProperties = ["adults", "children"].every((property) =>
    capacity.hasOwnProperty(property)
  );
  if (!hasCapacityProperties || !capacity.adults) {
    return next(
      new AppError(
        "Please provide room capacity and at least indicate the number of adults",
        400
      )
    );
  }
  const room = await Room.findOne({ where: { roomName: roomName } });

  if (room) {
    return next(
      new AppError(`Room with name ${roomName} is already added`, 400)
    );
  }

  const newRoom = await Room.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Room added successfully",
    data: {
      room: newRoom,
    },
  });
});

const getAllRooms = asyncHandler(async (req, res, next) => {
  const rooms = await Room.findAll();

  res.status(200).json({ status: "success", data: rooms });
});

const getRoom = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("No room id supplied", 400));

  const room = await Room.findOne({
    where: { id: id },
    include: [
      {
        model: Bed,
        as: "beds",
      },
    ],
  });

  console.log("room");
  console.log(room);
  if (!room) return next(new AppError("No room found", 404));

  res.status(200).json({ status: "success", data: { room: room } });
});

const updateRoomBasicInfo = asyncHandler(async (req, res, next) => {
  const { roomName, roomType, capacity, price } = req.body;
  const id = req.params.id;
  if (!id) return next(new AppError("No room id is supplied", 400));

  if (!roomName || !roomType || !capacity || !price) {
    return next(new AppError("Please fill out all mandatory fields", 400));
  }
  const hasPriceProperties = ["amount", "currency"].every((property) =>
    price.hasOwnProperty(property)
  );
  if (!hasPriceProperties || !price.amount || !price.currency) {
    return next(
      new AppError("Please provide the price amount and currency", 400)
    );
  }
  const hasCapacityProperties = ["adults", "children"].every((property) =>
    capacity.hasOwnProperty(property)
  );
  if (!hasCapacityProperties || !capacity.adults) {
    return next(
      new AppError(
        "Please provide room capacity and at least indicate the number of adults",
        400
      )
    );
  }
  let room = await Room.findOne({ where: { id: id } });

  if (!room) {
    return next(new AppError("Room of supplied id doesn't exist", 404));
  }

  if (room.dataValues.roomName === roomName) {
    room = await Room.findOne({ where: { roomName: roomName } });
    if (room) {
      return next(
        new AppError("Can't Update to already existing room name", 400)
      );
    }
  }
  room = await Room.update(req.body, { where: { id: id } });

  res.status(200).json({
    status: "success",
    message: "Room updated successfully",
    data: room,
  });
});

const updateRoomImage = asyncHandler(async (req, res, next) => {
  console.log("req.file");
  console.log(req.file);
  console.log("req.body");
  console.log(req.body);

  const file = req.file;
  const id = req.params.id;
  const viewType = req.body.viewType;
  if (!id) return next(new AppError("No room id is provided", 400));
  if (file == undefined) {
    return next(new AppError("Please provide a room image", 400));
  }
  if (!viewType) {
    return next(new AppError("Please provide room viewType", 400));
  }

  const mimeType = mime.lookup(file.originalname);
  const isImage = mimeType && mimeType.startsWith("image");
  if (!isImage) {
    return next(new AppError("Please provide file of image type", 400));
  }

  const imagePath = `rooms/${Date.now()}_${file.originalname}`;
  const upload = await new Upload(imagePath, next).add(file);
  const url = upload.url;

  const room = await Room.findOne({ where: { id: id } });
  const roomImages = room.dataValues.images;

  roomImages.map(async (image, index) => {
    if (image.viewType === viewType) {
      (roomImages[index].viewType = viewType),
        (roomImages[index].url = url),
        (roomImages[index].path = imagePath),
        (roomImages[index].createdAt = new Date().toISOString());
      await Room.update({ images: roomImages }, { where: { id: id } });
    }
  });

  res.status(200).json({
    status: "success",
    message: `The ${viewType} image of ${room.roomName} has been uploaded successfully`,
    data: null,
  });
});

const searchRooms = asyncHandler(async (req, res, next) => {
  console.log("req.body");
  console.log(req.body);
  console.log("req.params");
  console.log(req.params);
  console.log("req.query");
  console.log(req.query);
  // const rooms = await Room.findAll();
  // Create A View with all rooms having bookings (>Now )
  // Create Another View of room without any booking (<Now || !booking)

  res.status(200).json({ status: "success", data: [] });
});

module.exports = {
  addRoomBasicInfo,
  getAllRooms,
  getRoom,
  updateRoomBasicInfo,
  updateRoomImage,
  searchRooms,
};
