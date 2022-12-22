const User = require("../models/user.model")
const jwt = require("jsonwebtoken")


exports.signUp = async (req, res) => {
    const user = await User.create({
        email: req.body.email,
        password: req.body.password
    })
    res.status(200).json({message: "Success"})
}

exports.login = async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    if(user){
        if(user.password == req.body.password){
            var token = jwt.sign({ id: user._id }, "pass", {
                expiresIn: 86400 // 24 hours
            });
            res.status(200).cookie("auth", token).json({message: "Logged in", user})
        }else{
            res.status(500).json({message: "Wrong Password"})
        }
    }else{
        res.status(404).json({message: "User Not Found"})
    }
}

exports.status = async (req, res) => {
    const user = req.user
    console.log(user)
    if(user){
        res.status(200).json({message: "You are Logged in"})
    }else{
        res.status(500).json({message: "You are not Logged in"})
    }
}