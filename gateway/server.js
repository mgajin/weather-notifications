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

const PORT = process.env.PORT || 3000;

const server = gateway({
    routes: [
        { prefix: '/user', target: 'http://localhost:3001/v1/' },
        { prefix: '/weather', target: 'http://localhost:3002/v1/' }
    ]
});

server.start(PORT);
