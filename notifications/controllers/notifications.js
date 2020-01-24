const axios = require('axios');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load config vars
dotenv.config({
    path: './config/config.env'
});

// @desc    Get subscribed users from service 1
// @route   GET /v1/users
exports.getUsers = async (req, res) => {
    try {
        let response = await axios.get(`http://localhost:3001/v1/users`);

        let users = response.data.subscribed_users;

        if (!users) {
            return res.status(404).send('No users found');
        }

        for (i in users) {
            sendMails(users[i].email, 'ok');
        }

        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log(error);
    }
};

function sendMails(user, text) {
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

// @desc    Send email
// @route   GET /v1/mail
exports.sendMail = async (req, res) => {
    const { to, text } = req.body;

    let transporter = nodemailer.createTransport({
        host: 'smtp.googlemail.com',
        auth: {
            user: `${process.env.USERNAME}`,
            pass: `${process.env.PASSWORD}`
        }
    });

    let mailOptions = {
        from: '"WeatherAPI" <markogajiin@gmail.com>',
        to: to,
        subject: 'Weather',
        text: `${text}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(`Email sent: ${info.messageId}`);
    });

    res.status(200).json({ success: true });
};
