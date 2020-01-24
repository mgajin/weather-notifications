const express = require('express');
const gateway = require('fast-gateway');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Load config vars
dotenv.config({
    path: './config/config.env'
});

const app = express();

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
    res.header('access-Control-Allow-Methods', 'GET, POST, DELETE', 'PUT');
    next();
});

const PORT = process.env.PORT || 3000;

const server = gateway({
    routes: [
        { prefix: '/user', target: 'http://localhost:3001/v1/' },
        { prefix: '/weather', target: 'http://localhost:3002/v1/' }
    ]
});

server.start(PORT);
