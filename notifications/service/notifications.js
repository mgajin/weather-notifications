const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const transporter = require('../config/transporter');

const { getUsers } = require('../controller/notifications');

let notifications = schedule.scheduleJob('*/1 * * * *', async () => {
    let users = await getUsers();

    users.forEach(user => console.log(user));
});
