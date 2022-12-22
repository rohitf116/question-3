const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter a Title"]
    }
});



module.exports = mongoose.model("Post", postSchema);