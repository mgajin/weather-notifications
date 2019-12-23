const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

dotenv.config({ path: '../config.config.env' });

exports.register = async (req, res) => {
    const { name, email, username, password, password2 } = req.body;

    if (password !== password2) {
        return status(500).send('Passwords do not match');
    }

    const hashed = bcrypt.hashSync(password, 8);

    try {
        const user = await User.create({
            name,
            email,
            username,
            password: hashed
        });

        if (!user) {
            return res
                .status(500)
                .send('There was a problem registering the user');
        }
        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 86400
        });

        res.status(201).send({ auth: true, token, user });
    } catch (error) {
        console.log(error);
    }
};
