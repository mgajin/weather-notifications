const User = require('../models/User');

// @desc    Get users from database
// @route   GET /users
// @route   GET /users?subscribed=true
exports.getUsers = async (req, res) => {
    let users;
    const query = req.query.subscribed;
    // If query than return subscribed users
    if (query) {
        users = await User.find({ subscribed: query });
    } else {
        users = await User.find();
    }

    if (!users.length) {
        return res.status(404).send('Users not found');
    }

    res.status(200).json({ success: true, users });
};
