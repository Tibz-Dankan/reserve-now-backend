const Booking = require("../models").Booking;
const Room = require("../models").Room;
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

// TODO: To be renamed to updateBooking
const updateBookingWithRoom = asyncHandler(async (req, res, next) => {
  // TODO: To include numOfGuests of booking
  // TODO: To include totalPrice of booking
  // TODO: To include priceCurrency of booking

  const id = req.params.id; //bookingId
  const roomId = req.body.roomId;
  const numOfGuests = req.body.numOfGuests;
  if (!id) return next(new AppError("please provide booking id", 400));
  if (!roomId) return next(new AppError("please provide room id", 400));
  if (!numOfGuests) {
    return next(new AppError("Please provide number of guests", 400));
  }
  const booking = await Booking.findOne({
    where: { id: id },
    include: [
      {
        model: Room,
        as: "room",
        // where: { id: roomId },
        required: false,
        right: true,
      },
    ],
  });
  console.log("booking");
  console.log("booking");
  console.log(booking.dataValues);
  req.body.bookingStage = "selectRoom";

  const updateBooking = await Booking.update(req.body, { where: { id: id } });
  res.status(200).json({ status: "success", data: updateBooking });
});

const getBooking = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("please provide booking id", 400));
  const booking = await Booking.findOne({ where: { id: id } });
  res.status(200).json({ status: "success", data: booking });
});

const getBookingByUser = asyncHandler(async (req, res, next) => {
  const userId = req.body.userId;
  if (!userId) return next(new AppError("please provide userId", 400));
  const booking = await Booking.findOne({ where: { userId: userId } });
  res.status(200).json({ status: "success", data: booking });
});

const getAllBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.findAll();
  res.status(200).json({ status: "success", data: bookings });
});

module.exports = {
  addBookingDates,
  updateBookingWithRoom,
  getBooking,
  getBookingByUser,
  getAllBookings,
};

// ---- OVERALL TODOS ----
// 1. send email successful signup
// 2. implement contact controller and include email(To admin)
// 3. implement payments using stripe and flutter wave
