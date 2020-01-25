const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const transporter = require('../config/transporter');

const { getUsers, getWeather } = require('../controller/notifications');

let notifications = schedule.scheduleJob('*/1 * * * *', async () => {
    // let users = await getUsers();

    let weather = await getWeather('London');
    console.log(weather);

    // users.forEach(user => console.log(user));
});
