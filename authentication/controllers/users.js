const User = require('../models/User');

// @desc    Get users from database
// @route   GET /users
// @route   GET /users?subscribed=true
exports.getUsers = async (req, res) => {
    let users;
    // const query = req.query.subscribed;
    // If query than return subscribed users
    // if (query) {
    //     users = await User.find({
    //         subscription: {
    //             status: true
    //         }
    //     });
    // } else {
    //     users = await User.find();
    // }
    users = await User.find();
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

    res.status(200).json({ success: true, subscribed_users });
};
