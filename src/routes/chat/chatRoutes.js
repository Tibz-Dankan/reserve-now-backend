const express = require("express");
const { getChatRecipients } = require("../../controllers/chatController");
const { protect } = require("../../controllers/userController");

const router = express.Router();

router.get("/get-chat-recipients/:userId", protect, getChatRecipients);

const chatRoutes = router;
module.exports = { chatRoutes };
