// const Room = require("../models").Room;
const User = require("../models").User;
const { AppError } = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");
const { Op } = require("sequelize");

const path = require("path");

const getChatRecipients = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;

  if (!userId) return next(new AppError("No userId if provided", 400));

  const recipients = await User.findAll({
    where: {
      id: {
        [Op.ne]: userId,
      },
    },
  });

  console.log("recipients");
  console.log(recipients);

  res.status(201).json({
    status: "success",
    message: "Recipients fetched successfully",
    data: recipients,
  });
});

module.exports = { getChatRecipients };
