const mongoose = require("mongoose");

const url = "mongodb+srv://ravinder:Dnf8o08NkFpnbZlL@interview.biygsci.mongodb.net/"

exports.connectDB = () => {
    mongoose
    .connect(url).then((con)=> console.log("Connected Successfully"))
    .catch((err)=> console.log("Not Connected", err))
}