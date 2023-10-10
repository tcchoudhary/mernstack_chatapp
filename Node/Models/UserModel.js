const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: "String"},
    email: { type: "String"},
    password: { type: "String"},
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,

      default: false,
    },
  },
  { timestaps: true }
);


const User = mongoose.model("User", userSchema);

module.exports = User;
