const express = require("express");
const {
  signup,
  signin,
  resetPassword,
  forgotPassword,
} = require("../../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

const userRoutes = router;
module.exports = { userRoutes };
