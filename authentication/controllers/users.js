const User = require('../models/User');

// @desc    Get users from database
// @route   GET /users
// @route   GET /users?subscribed=true
exports.getUsers = async (req, res) => {
    let users = await User.find();
    let subscribed_users = new Array();

    for (i in users) {
        let user = users[i];
        if (user.subscription.status) {
            subscribed_users.push(user);
        }
    }

    if (!subscribed_users.length) {
        return res.status(404).send('Users not found');
    }

    res.status(200).json({ success: true, users: subscribed_users });
};
