const express = require("express");
const { addBeds } = require("../../controllers/bedController");
const { protect } = require("../../controllers/userController");

const router = express.Router();

router.post("/add-bed", protect, addBeds);

const bedRoutes = router;
module.exports = { bedRoutes };
