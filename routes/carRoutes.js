const express = require("express");
const carController = require('./../controller/carController');

const router = express.Router();
// const authController = require('./../controllers/authController');


router
    .route('/')
    .get(carController.getAllCars)
    .post(carController.createCar);

router
    .route('/:id')
    .get(carController.getCar)
    .patch(
        // tourController.uploadTourImages,
        // tourController.resizeTourImages,
        carController.updateCar)
    .delete(
        carController.deleteCar
    );

module.exports = router;