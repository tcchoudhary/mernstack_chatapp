const mongoose = require('mongoose');
require('dotenv').config();
const db = async(req,res)=>{
    try {
        mongoose.connect(process.env.HOSTED_DB_URL).then((connection) => {
            console.log("connected to hosted chat-app");
          });
    } catch (err) {
        console.log(err.message);
        process.exit();
    }
}

module.exports = db;