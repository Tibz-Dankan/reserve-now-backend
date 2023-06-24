const express = require("express");
const {
  addBookingDates,
  updateBookingWithRoom,
  getBooking,
  getBookingByUser,
  getAllBookings,
} = require("../../controllers/bookingController");
const { protect } = require("../../controllers/userController");

const router = express.Router();

router.post("/api/booking/add-booking-dates", protect, addBookingDates);
router.patch(
  "/api/booking/update-booking-with-room/:id",
  protect,
  updateBookingWithRoom
);
router.get("/api/booking/get-booking/:id", protect, getBooking);
router.get("/api/booking/get-booking-by-user", protect, getBookingByUser);
router.get("/api/booking/get-all-bookings", protect, getAllBookings);

const bookingRoutes = router;

module.exports = { bookingRoutes };
