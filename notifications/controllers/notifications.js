const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const transporter = require('../config/transporter');

const { getUsers, getWeather } = require('./service');

// @desc    Scedule notifications
let notifications = schedule.scheduleJob('*/1 * * * *', async () => {
    const users = await getUsers();
    let weathers = new Array();

    for (i in users) {
        const cities = users[i].subscription.list;
        for (j in cities) {
            const weather = await getWeather(cities[j]);
            weathers.push(weather);
        }
        sendEmail(users[i], weathers);
    }
});

// @desc    Make email text
function makeMessage(weathers) {
    let text = 'Weathers for today \n';

    weathers.forEach(weather => {
        text += `${weather.city}: ${weather.description}, ${weather.temp} \n`;
    });

    return text;
}

// @desc    Send email to user
function sendEmail(user, weathers) {
    let mailOptions = {
        from: `"WeatherAPI" <${process.env.USERNAME}>`,
        to: `${user.email}`,
        subject: 'Weather',
        text: makeMessage(weathers)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(`Email sent: ${info.messageId}`);
    });
}
