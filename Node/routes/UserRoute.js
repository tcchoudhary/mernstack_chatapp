const express = require('express');
const {AddUser,allUsers,login}= require('../Controllers/UserController');
const { protect } = require("../middleware/authmiddleware");
const user_route = express();





user_route.post('/register',AddUser);
user_route.get('/user',protect,allUsers);
user_route.post('/login',login);

module.exports = user_route;
 