const express = require("express");
const {
  addBookingDates,
  updateBooking,
  getBooking,
  getBookingByUser,
  getAllBookings,
} = require("../../controllers/bookingController");
const { protect } = require("../../controllers/userController");

const router = express.Router();

router.post("/add-booking-dates", protect, addBookingDates);
router.patch("/update-booking/:id", protect, updateBooking);
router.get("/get-booking/:id", protect, getBooking);
router.get("/get-booking-by-user", protect, getBookingByUser);
router.get("/get-all-bookings", protect, getAllBookings);

const bookingRoutes = router;

module.exports = { bookingRoutes };
