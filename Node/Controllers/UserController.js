const asyncHandler = require("express-async-handler");
const generateToken = require("../config/JwtToken");
const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');

const SecurePassword = async(password) =>{
  try {
    const Hashpassword = await bcrypt.hash(password,10);
    return  Hashpassword;
  } catch (err) {
    // console.log(err);
  }
};


const AddUser = asyncHandler(async (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const pic = req.body.pic;
    const Spassword = await SecurePassword(password);
    // console.log("-----------------log spassword ----------------");
    // console.log(Spassword)
    // console.log("-----------------log spassword ----------------");
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
     name:name,
     email:email,
     password:Spassword,
     pic:pic
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });

 
  const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  });

  const login = asyncHandler(async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findOne({email});
      const passwordCheck = await   bcrypt.compare(password,user.password);
      // Check for user
      if (user && passwordCheck) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          pic: user.pic,
          token: generateToken(user._id),
        });
      }
      else {
        res.status(401);
        throw new Error("Invalid Email or Password");
      }
    } catch (err) {
      // console.log(err)
    }
  });
  

  module.exports = {
    AddUser,
    login,
    allUsers
  };


