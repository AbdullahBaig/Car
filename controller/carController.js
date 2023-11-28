const { query } = require('express');
const multer = require("multer"); //used for image uplodaing
const sharp = require('sharp'); //use for resizing images
// const sharp = require('sharp'); //use for resizing images
const Car = require('../models/carmodel');
const catchAsync = require('./../utility/catchAsync');



//for uploading multiple images
const multerStorage = multer.memoryStorage(); // image will be stored as a buffer in a memory
//we use filter to not upload files other then images
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage : multerStorage ,
    fileFilter : multerFilter
})

exports.uploadTourImages = upload.fields([ // for collection of single and multiple images
    { name: 'images', maxCount: 10 }
]);

exports.resizeTourImages = catchAsync(async (req, res, next) => {
    //if there is no image in imageCover and images move to next middleware
    if (!req.files.images) return next();

    req.body.images = [];

    await Promise.all(
        req.files.images.map(async (file, i) => {
            const filename = `car-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

            await sharp(file.buffer)
                .resize(2000, 1333)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`public/img/car/${filename}`);

            req.body.images.push(filename); //pushing images to req.body.images array
        })
    );

    next();
});




exports.createCar = catchAsync( async (req , res , next) => {
    const newCar = await Car.create(req.body);

    console.log('Request Body:', req.body);
    res.status(201).json({
        status : 'success' ,
        data: {
            car: newCar
        },
    });
});



exports.getAllCars = catchAsync( async (req, res, next) => {

      const cars = await Car.find(req.query);

      res.status(200).json({
        status: 'success',
        results: cars.length,
        data: {
            cars
        }
      });
  });

exports.getCar = catchAsync( async (req, res, next) => {
      const car =  await Car.findById(req.params.id);

      if (!car){ // ye function islie lgaya ha k agr tour ki id galat pass hui ho to kya response dena
        return  next(new AppError('No car found for this id', 404));
      };

      res.status(200).json({
        status : 'success' ,
        data : {
            car
        }
    });
});


exports.updateCar = catchAsync( async  (req , res, next)=>{
      const car = await Car.findByIdAndUpdate(req.params.id, req.body , {
            new : true,
            runValidators: true
        });

        if (!car){
            return  next(new AppError('No car found for this id', 404));
          };
        res.status(200).json({
            status : 'success',
            data : {
                car
            }
        });
});



exports.deleteCar = catchAsync( async (req , res, next)=>{
        const car = await Car.findByIdAndDelete(req.params.id);

         if (!car){
            return  next(new AppError('No tour found for this id', 404));
          };

        res.status(204).json({ //204 means deleted
            status : 'success',
            data : null //we are not sending any data back so we use null
        });
});
