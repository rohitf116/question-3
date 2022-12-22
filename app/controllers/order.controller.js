const Order = require("../models/order.model")

exports.newOrder = async (req, res) => {
    const {product, amount, date} = req.body;

    await Order.create({product, amount, date})

    res.status(200).json({message: "Order Created"})
}