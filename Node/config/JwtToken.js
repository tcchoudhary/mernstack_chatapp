const jwt = require("jsonwebtoken");
const {SECRET_KEY} = process.env
const generateToken = (id) => {
  return jwt.sign({ id },process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
