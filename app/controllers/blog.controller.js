const mongoose = require("mongoose");
ObjectId = mongoose.Types.ObjectId;
const userModel = require("../models/user.model");
const postModel = require("../models/post.model");
const isValid = (str) => {
  if (str === undefined || str === null) return null;
  if (typeof str === "string" && str.trim().length === 0) return null;
  return true;
};

exports.createBlog = async (req, res) => {
  try {
    const { title, author_id, body, category } = req.body;
    if (!Object.keys(req.body)) {
      return res
        .status(400)
        .json({ status: false, message: "Body cannot be empty" });
    }
    if (!isValid(title)) {
      return res
        .status(400)
        .json({ status: false, message: "title cannot be empty" });
    }
    const founName = await postModel.findOne({ title });
    if (founName) {
      return res
        .status(400)
        .json({ status: false, message: "This name is already being used" });
    }
    if (!isValid(body)) {
      return res
        .status(400)
        .json({ status: false, message: "body cannot be empty" });
    }
    if (!isValid(category)) {
      return res
        .status(400)
        .json({ status: false, message: "category cannot be empty" });
    }
    if (!isValid(author_id)) {
      return res
        .status(400)
        .json({ status: false, message: "author_id cannot be empty" });
    }
    if (!ObjectId(author_id)) {
      return res
        .status(400)
        .json({ status: false, message: "invalid author id" });
    }
    const foundUser = await userModel.findOne({ _id: author_id });
    if (!foundUser) {
      return res
        .status(400)
        .json({ status: false, message: "No author found" });
    }
    const blogCreated = await postModel.create({
      title,
      author_id,
      body,
      category,
    });
    console.log(blogCreated._id, "++++++++++++++++");
    await userModel.findOneAndUpdate(
      { _id: author_id },
      { $push: { blogPosts: blogCreated._id } }
    );
    res
      .status(201)
      .json({ status: true, message: "Success", data: blogCreated });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Sever error", error: error.message });
  }
};

exports.deletBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValid(id)) {
      return res
        .status(400)
        .json({ status: false, message: "id cannot be empty" });
    }
    if (!ObjectId(id)) {
      return res.status(400).json({ status: false, message: "invalid  id" });
    }
    const foundBlog = await postModel.findByIdAndDelete(id);
    if (!foundBlog) {
      return res.status(404).json({ status: false, message: "No blog found" });
    }
    console.log(foundBlog);
    const bynn = await userModel.findOne({ $in: ["blogPosts"] });
    const newBlogs = bynn.toObject();
    const arrr = newBlogs.blogPosts.filter((x) => x.toString() == id);
    console.log();
    const news = await userModel.findOneAndUpdate(
      { _id: bynn._id },
      { $set: { blogPosts: arrr } }
    );
    res.status(200).json({ status: true, message: "deleted" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Sever error", error: error.message });
  }
};
