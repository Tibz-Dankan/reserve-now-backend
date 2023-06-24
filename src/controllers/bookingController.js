const Booking = require("../models").Booking;
const { AppError } = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");
const { Email } = require("../utils/email");
const { Op } = require("sequelize");

const addBookingDates = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  //   TODO: to add timezone time date conversion to validate checkindate(checkin > now)
  const { checkInDate, checkOutDate, userId } = req.body;
  if (!userId) return next(new AppError("Please provide a userId", 400));
  if (!checkInDate || !checkOutDate) {
    return next(
      new AppError("please provide check-in and check-out dates!", 400)
    );
  }
  const oneDayMillSec = 1000 * 60 * 60 * 24;
  const checkInMillSec = new Date(checkInDate).getTime();
  const checkOutMillSec = new Date(checkOutDate).getTime();

  if (checkOutMillSec - checkInMillSec < oneDayMillSec) {
    return next(
      new AppError("please provide valid check-in and check-out dates!", 400)
    );
  }
  const bookingDates = await Booking.create(req.body);
  res.status(201).json({ status: "success", data: bookingDates });
});

module.exports = { addBookingDates };
