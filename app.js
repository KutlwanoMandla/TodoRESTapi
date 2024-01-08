const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const taskRouter = require('./routes/tasks');
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://kutlwano:' + 
    process.env.MONGO_ATLAS_PASSWORD +
     '@newprojectcluster.dbpspqy.mongodb.net/?retryWrites=true&w=majority');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Handling CORS Errors
app.use ((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Allow-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        res.status(200).json({});
    }
    next();
});

app.use('/tasks', taskRouter);

// Error Handling
app.use((req, res, next) => {
    const error = new Error('Request Could NOT be Handled, Not Found');
    error.status(401);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;