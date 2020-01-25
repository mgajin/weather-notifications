const User = require('../models/User');

// @desc    Get users from database
// @route   GET /users
// @route   GET /users?subscribed=true
exports.getUsers = async (req, res) => {
    let users = await User.find();

    if (req.query) {
        let subscribed_users = new Array();
        users.forEach(user => {
            if (user.subscription.status) {
                subscribed_users.push(user);
            }
        });

        users = subscribed_users;
    }

    if (!users) {
        return res.status(404).send('Users not found');
    }

    res.status(200).json({ success: true, users });
};
