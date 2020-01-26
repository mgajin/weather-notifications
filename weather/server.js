const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

// Load env variables
dotenv.config({
    path: './config/config.env'
});

// Connect to database (service2)
connectDB();

// Route files
const weather = require('./routes/weather');

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// CORS middleware
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('access-Control-Allow-Methods', 'GET, POST, DELETE');
    next();
});

// Mount routes
app.use('/v1', weather);

const PORT = process.env.PORT || 3002;

const server = app.listen(
    PORT,
    console.log(
        `Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
    )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
});
