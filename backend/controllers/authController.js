const User = require('../models/userModel');

const jwt = require('jsonwebtoken');

//Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

//Register User
exports.registerUser = async (req, res) => {};

//Login User
exports.loginUser = async (req, res) => {};

//Get User Info
exports.getUserInfo = async (req, res) => {};