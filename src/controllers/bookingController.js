const Booking = require("../models").Booking;
const Room = require("../models").Room;
const User = require("../models").User;
const BookedRoom = require("../models").BookedRoom;
const { AppError } = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");
const { Email } = require("../utils/email");
const { Op } = require("sequelize");
const { calTotalPrice } = require("../utils/calTotalPrice");

const addBooking = asyncHandler(async (req, res, next) => {
  console.log("req.body", req.body);
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
  const rooms = req.body.rooms;
  // TODO: validate rooms, numOfGuests, price(total and currency)
  // return;
  const newBooking = await Booking.create(req.body);
  const bookingId = newBooking.dataValues.id;

  rooms.map(async (room) => {
    await BookedRoom.create({ bookingId: bookingId, roomId: room.id });
  });
  newBooking.dataValues.rooms = rooms;

  res.status(201).json({
    status: "success",
    message: "Booking made successfully",
    data: {
      newBooking: newBooking,
    },
  });
});

const updateBooking = asyncHandler(async (req, res, next) => {
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
        model: User,
        as: "user",
      },
    ],
  });
  const room = await Room.findOne({ where: { id: roomId } });

  const roomNumber = room["dataValues"].roomNumber;
  const roomPrice = room["dataValues"].price;
  const checkInDate = booking["dataValues"].checkInDate;
  const checkOutDate = booking["dataValues"].checkOutDate;

  req.body.bookingStage = "selectRoom";
  req.body.priceCurrency = room["dataValues"].priceCurrency;
  req.body.totalPrice = calTotalPrice(checkInDate, checkOutDate, roomPrice);

  const user = booking.user["dataValues"];
  await new Email(user.email, "Booking Received").sendBookingNotification(
    user.name,
    roomNumber
  );
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
  // TODO: to add pagination
  const bookings = await Booking.findAll();
  res.status(200).json({ status: "success", data: bookings });
});

module.exports = {
  addBooking,
  updateBooking,
  getBooking,
  getBookingByUser,
  getAllBookings,
};

// ---- OVERALL TODOS ----
// 1. send email successful signup
// 2. implement contact controller and include email(To admin)
// 3. implement payments using stripe and flutter wave
