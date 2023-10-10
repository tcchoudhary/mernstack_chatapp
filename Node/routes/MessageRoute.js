const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../Controllers/MessageController");
const { protect } = require("../middleware/authmiddleware");

const message_Route = express();

message_Route.get("/:chatId",protect, allMessages);
message_Route.post("/",protect, sendMessage);

module.exports = message_Route;
