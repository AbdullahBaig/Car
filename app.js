const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Add this line
const app = express();

app.use(cors());
app.use(bodyParser.json());
const carRouter = require('./routes/carRoutes');
const userRouter = require('./routes/userRouter');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cars', carRouter);
app.use('/api/users', userRouter);

module.exports = app;