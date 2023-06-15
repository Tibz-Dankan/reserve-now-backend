const User = require("../models").User;
const { AppError } = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");
const { Auth } = require("../utils/auth");
const { Email } = require("../utils/email");
const { createHash } = require("crypto");
const { Op } = require("sequelize");

const signup = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const country = req.body.country;

  console.log(req.body);

  if (!name || !email || !password) {
    return next(new AppError("Please fill out all fields", 400));
  }
  if (!email.includes("@")) {
    return next(new AppError("Please supply a valid email", 400));
  }
  const user = await User.findOne({ where: { email: email } });
  if (user) return next(new AppError("Email already registered", 400));

  const newUser = User.build(req.body);
  await newUser.save();

  await new Auth(newUser, 201, res).send();
});

const signin = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return next(new AppError("Please fill out all fields", 400));
  }
  const user = await User.findOne({ where: { email: email } });
  console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid email or password", 400));
  }
  await new Auth(user, 200, res).send();
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const email = req.body.email;

  if (!email) return next(new AppError("Please fill out all fields", 400));
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    return next(new AppError("There is no user with supplied email", 404));
  }

  const resetToken = user.createPasswordResetToken();
  console.log(resetToken);
  await user.save();

  const resetURL = `${req.protocol}://localhost:3000/reset-password/${resetToken}`;
  const subject = "Reset Password";

  console.log("resetURL");
  console.log(resetURL);

  await new Email(email, subject).sendPasswordReset(resetURL, user.name);

  res.status(200).json({
    status: "success",
    message: "Password reset token sent to email",
  });
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const token = req.params.token;
  if (!token) return next(new AppError("Please a reset token", 400));
  const hashedToken = createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: { [Op.gt]: Date.now() },
    },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  await new Auth(user, 200, res).send();
});

module.exports = { signup, signin, forgotPassword, resetPassword };