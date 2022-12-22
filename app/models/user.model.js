const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, "Please Enter an Email"],
        unique: [true, "This Email is already is use"],
    },
    password: {
        type: String,
        required: [true, "Please Enter a Password"]
    },
    blogPosts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
});



module.exports = mongoose.model("User", userSchema);