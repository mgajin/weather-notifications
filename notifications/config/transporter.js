const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com',
    auth: {
        user: `${process.env.USERNAME}`,
        pass: `${process.env.PASSWORD}`
    }
});

module.exports = transporter;
