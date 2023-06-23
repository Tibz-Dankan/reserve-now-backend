const express = require("express");
const { addBookingDates } = require("../../controllers/bookingController");

const router = express.Router();

router.post("/api/booking/add-booking-dates", addBookingDates);

const bookingRoutes = router;

module.exports = { bookingRoutes };
