const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user =
            await User.create({

                name,
                email,
                password: hashedPassword

            });

        const token =
            jwt.sign(

                {
                    userId: user._id
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "1d"
                }

            );

        res.status(201).json({
            message: "User registered",
            token
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// LOGIN
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "Invalid credentials"
            });

        }

        const match =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!match) {

            return res.status(400).json({
                message: "Invalid credentials"
            });

        }

        const token =
            jwt.sign(

                {
                    userId: user._id
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "1d"
                }

            );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// GET CURRENT USER
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// UPDATE USER NAME
exports.updateMe = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            });
        }
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { name },
            { new: true }
        ).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};