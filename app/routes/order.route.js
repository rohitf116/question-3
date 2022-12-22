const express = require("express");
const {
  newOrder,
  getData,
  getDataDate,
} = require("../controllers/order.controller");

const router = express.Router();
router.route("/api/test/new-order").post(newOrder);
router.route("/api/test/new-order").get(getData);
router.route("/api/test/new-order-date").get(getDataDate);

module.exports = router;
