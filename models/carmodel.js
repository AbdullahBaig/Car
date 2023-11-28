const mongoose = require('mongoose');
// const validator = require('validator');
// const User = require('./usermodel');


const carSchema = new mongoose.Schema({

    vehicleName : {
            type : String,
        },

        year : {
            type : Number,
        },
        model : {
            type : String,
        },
        city : {
            type : String,
        },
        phone : {
            type : Number,
        }
    ,
    images: [{
        url: {
            type: String,
            required: true,
        },
    }],
    }
);



const Car = mongoose.model('Car', carSchema);

module.exports = Car;