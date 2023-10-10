const express = require('express');
const {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    removeFromGroup,
    addToGroup,
  } = require("../Controllers/ChatController");
const { protect } = require("../middleware/authmiddleware");
const chat_route = express();



chat_route.post('/',protect,accessChat);
chat_route.get('/',protect,fetchChats);
chat_route.post('/group',protect,createGroupChat);
chat_route.put('/rename',protect,renameGroup);
chat_route.put('/removeGroup',protect,removeFromGroup);
chat_route.put('/addgroup',protect,addToGroup);


module.exports = chat_route;