const express = require("express");
const { addBookingDates } = require("../../controllers/bookingController");
const { protect } = require("../../controllers/userController");

const router = express.Router();

router.post("/api/booking/add-booking-dates", protect, addBookingDates);

const bookingRoutes = router;

module.exports = { bookingRoutes };
