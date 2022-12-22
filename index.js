const { connectDB } = require("./app/config/db.config");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  credentials: true,
};

///routes

const user = require("./app/routes/user.route");
const order = require("./app/routes/order.route");
const post = require("./app/routes/post.route");
app.use("/", user);
app.use("/", order);
app.use("/", post);

connectDB();
app.listen(4000, () => {
  console.log("server started at port 4000");
});
