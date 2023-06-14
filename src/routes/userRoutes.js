const express = require("express");
const {
  signup,
  signin,
  resetPassword,
  forgotPassword,
} = require("../controllers/userController");

const router = express.Router();

router.post("/api/users/signup", signup);
router.post("/api/users/signin", signin);
router.post("/api/users/forgot-password", forgotPassword);
router.patch("/api/users/reset-password/:token", resetPassword);

const userRoutes = router;
module.exports = { userRoutes };
