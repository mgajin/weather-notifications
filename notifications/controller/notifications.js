const axios = require('axios');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load config vars
dotenv.config({
    path: './config/config.env'
});

// @desc    Get subscribed users from service 1
exports.getUsers = async () => {
    try {
        let response = await axios.get(`http://localhost:3001/v1/users`);

        let users = response.data.users;

        if (!users) {
            console.log('No users');
            return null;
        }

        return users;
    } catch (error) {
        console.log(error);
    }
};

function sendMail(user, text) {
    console.log(`${user}, ${text}`);

    // let transporter = nodemailer.createTransport({
    //     host: 'smtp.googlemail.com',
    //     auth: {
    //         user: `${process.env.USERNAME}`,
    //         pass: `${process.env.PASSWORD}`
    //     }
    // });

    // let mailOptions = {
    //     from: '"WeatherAPI" <markogajiin@gmail.com>',
    //     to: user,
    //     subject: 'Weather',
    //     text: `${text}`
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log(`Email sent: ${info.messageId}`);
    // });
}
