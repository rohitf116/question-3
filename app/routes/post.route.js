//createBlog

const express = require("express");
const { createBlog, deletBlog } = require("../controllers/blog.controller");
const { isAuth } = require("../middlewares/isAuth");

const router = express.Router();
router.route("/api/test/blog").post(isAuth, createBlog);
router.route("/api/test/blog/:id").post(isAuth, deletBlog);

module.exports = router;
