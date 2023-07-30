const User = require("../models").User;
const Chat = require("../models").Chat;
const { AppError } = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");
const { Op } = require("sequelize");

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

  res.status(200).json({
    status: "success",
    message: "Recipients fetched successfully",
    data: recipients,
  });
});

//TODO: function to detect user typing status

const saveChatMessage = async (msgObj) => {
  await Chat.create(msgObj);
  console.log("message saved");
};

const joinChatRoom = (socket) => {
  socket.on("joinRoom", (chatRoomId) => {
    socket.join(chatRoomId);
    console.log("User joined room with Id#: " + chatRoomId);
  });
};

const receiveSendMessage = (socket) => {
  socket.on("sendMessage", (msgObj) => {
    console.log("Message sent: ");
    console.log(msgObj);
    socket.to(msgObj.chatRoomId).emit("receiveMessage", msgObj);
    saveChatMessage(msgObj);
  });
};

const leaveChatRoom = (socket) => {
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
};

const chatHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("socket id: " + socket.id);
    joinChatRoom(socket);
    receiveSendMessage(socket);
    leaveChatRoom(socket);
  });
};

module.exports = { getChatRecipients, chatHandler };
