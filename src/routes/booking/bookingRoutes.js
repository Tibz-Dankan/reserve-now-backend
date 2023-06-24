const express = require("express");
const {
  addBookingDates,
  updateBookingWithRoom,
} = require("../../controllers/bookingController");
const { protect } = require("../../controllers/userController");

const router = express.Router();

router.post("/api/booking/add-booking-dates", protect, addBookingDates);
router.patch(
  "/api/booking/update-booking-with-room/:id",
  protect,
  updateBookingWithRoom
);

const bookingRoutes = router;

module.exports = { bookingRoutes };
