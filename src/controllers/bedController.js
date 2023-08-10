const Bed = require("../models").Bed;
const { AppError } = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");

const addBeds = asyncHandler(async (req, res, next) => {
  console.log("req.body");
  console.log(req.body);
  const roomId = req.body.roomId;
  const bedTypes = req.body.bedTypes;

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
    console.log("newBed");
    console.log(newBed);
  });

  res.status(201).json({
    status: "success",
    message: "Beds added successfully",
  });
});

module.exports = {
  addBeds,
};
