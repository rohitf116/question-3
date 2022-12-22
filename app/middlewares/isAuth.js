const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
    try {
        const { auth } = req.cookies;

        if(!auth) {
            return res.status(401).json({ message: "Login First" });
        }
     
        const decodedCookie = jwt.verify(
            auth, "pass"
        );
        req.user = await User.findById(decodedCookie.id);

        next();
    } catch (error) {
        res.status(500).json({ success: false, message:error.message });
    }
};