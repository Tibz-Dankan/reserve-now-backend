const Bed = require("../models").Bed;
const Room = require("../models").Room;

const { AppError } = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");

const addBeds = asyncHandler(async (req, res, next) => {
  const roomId = req.body.roomId;
  const bedTypes = req.body.bedTypes;

  // TODO: add validation to avoid adding more beds to the room beyond its capacity

  if (!roomId) return next(new AppError("Please a roomId", 400));
  if (!bedTypes[0]) {
    return next(new AppError("Please provide at least one bed", 400));
  }

  bedTypes.map(async (bedType) => {
    console.log("Inside the loop");
    if (!bedType) {
      return next(
        new AppError(`Please provide value for bedType ${bedType}`, 400)
      );
    }
    const newBed = await Bed.create({
      roomId: roomId,
      bedType: bedType,
    });
  });

  res.status(201).json({
    status: "success",
    message: "Beds added successfully",
  });
});

const updateBeds = asyncHandler(async (req, res, next) => {
  const roomId = req.body.roomId;
  const bedTypes = req.body.bedTypes;

  if (!roomId) return next(new AppError("Please a roomId", 400));
  if (!bedTypes[0]) {
    return next(new AppError("Please provide at least one bed", 400));
  }
  const room = await Room.findOne({ where: { id: roomId } });
  if (!room) return next(new AppError(`Room with id: ${roomId}`, 400));

  // Delete all beds belonging to a room
  await Bed.destroy({
    where: {
      roomId: roomId,
    },
  });

  // save the new beds
  bedTypes.map(async (bedType) => {
    if (!bedType) {
      return next(
        new AppError(`Please provide value for bedType ${bedType}`, 400)
      );
    }
    await Bed.create({
      roomId: roomId,
      bedType: bedType,
    });
  });

  const updatedRoom = await Room.findOne({
    where: { id: roomId },
    include: [
      {
        model: Bed,
        as: "beds",
      },
    ],
  });

  res.status(201).json({
    status: "success",
    message: "Beds updated successfully",
    data: {
      room: updatedRoom,
    },
  });
});

module.exports = {
  addBeds,
  updateBeds,
};
