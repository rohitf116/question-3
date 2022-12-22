const Order = require("../models/order.model");

exports.newOrder = async (req, res) => {
  const { product, amount, date } = req.body;

  await Order.create({ product, amount, date });

  res.status(200).json({ message: "Order Created" });
};
exports.getData = async (req, res) => {
  try {
    const myData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: "$product",
          orders: { $sum: 1 },
          amount: { $sum: { $toInt: "$amount" } },
        },
      },
      {
        $project: {
          Product: "$_id",
          orders: 1,
          amount: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      status: true,
      message: "Success",
      count: myData.length,
      data: myData,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Sever error", error: error.message });
  }
};

exports.getDataDate = async (req, res) => {
  try {
    const myData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%d %m %Y",
              date: "$createdAt",
            },
          },
          orders: { $sum: 1 },
          amount: { $sum: { $toInt: "$amount" } },
        },
      },
    ]);

    res.status(200).json({
      status: true,
      message: "Success",
      count: myData.length,
      data: myData,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Sever error", error: error.message });
  }
};
