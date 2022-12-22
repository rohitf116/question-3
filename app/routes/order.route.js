const express = require("express");
const { newOrder } = require("../controllers/order.controller");

const router = express.Router();
router.route("/api/test/new-order").post(newOrder)



module.exports = router;