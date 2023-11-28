const express = require("express");
const userController = require('./../controller/userController');

const router = express.Router();
// const authController = require('./../controllers/authController');


router.post('/login', userController.login);

module.exports = router;