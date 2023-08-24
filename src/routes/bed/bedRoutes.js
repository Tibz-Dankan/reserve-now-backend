const express = require("express");
const { addBeds, updateBeds } = require("../../controllers/bedController");
const { protect } = require("../../controllers/userController");

const router = express.Router();

router.post("/add-bed", protect, addBeds);
router.patch("/update-bed", protect, updateBeds);

const bedRoutes = router;
module.exports = { bedRoutes };
