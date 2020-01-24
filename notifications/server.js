const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const bodyParser = require('body-parser');

// Load config vars
dotenv.config({
    path: './config/config.env'
});

const PORT = process.env.PORT || 3003;

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/v1', require('./routes/notifications'));

const server = app.listen(
    PORT,
    console.log(
        `Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
    )
);
