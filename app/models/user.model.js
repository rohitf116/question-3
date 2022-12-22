const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please Enter an Email"],
      unique: [true, "This Email is already is use"],
    },
    password: {
      type: String,
      required: [true, "Please Enter a Password"],
    },
    blogPosts: [{ type: ObjectId, ref: "Post", default: [] }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
