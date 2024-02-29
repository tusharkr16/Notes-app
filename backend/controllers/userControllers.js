const User = require("../models/userModel")
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;


    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400)
        throw new Error("User Already Exist");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error("Error occurred");
    }

    res.json({
        name, email,
    })
    console.log("hello")
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(412).json({ error: "Invalid credentials" });
        }
        else {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
                token: generateToken(user._id)
            });
        }
    }
})

module.exports = { registerUser, authUser }