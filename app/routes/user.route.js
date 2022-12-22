const express = require("express");
const { login, signUp, status } = require("../controllers/user.controller");
const { isAuth } = require("../middlewares/isAuth");

const router = express.Router();
router.route("/api/test/login").post(login)
router.route("/api/test/signup").post(signUp)
router.route("/api/test/status").post(isAuth, status)


module.exports = router;