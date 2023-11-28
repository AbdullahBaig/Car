const { query } = require('express');
// const multer = require("multer"); //used for image uplodaing
// const sharp = require('sharp'); //use for resizing images
const Car = require('../models/carmodel');
const User = require('../models/usermodel');

const catchAsync = require('./../utility/catchAsync');

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Check credentials in MongoDB
    const user = await User.findOne({ email, password });

    if (user) {
        // Successful login
        res.status(200).json({
            status: 'success',
            message: 'Login successful! Redirecting to the next screen...',
            data: {
                user,
            },
        });
    } else {
        // Incorrect credentials
        res.status(401).json({
            status: 'fail',
            message: 'Invalid credentials. Please try again.',
        });
    }
});
