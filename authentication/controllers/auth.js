const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

dotenv.config({ path: '../config.config.env' });

// @desc    Register new user
// @route   POST /v1/auth/register
exports.register = async (req, res) => {
    const { email, username, password, password2 } = req.body;

    if (password !== password2) {
        return res.status(500).send('Passwords do not match');
    }

    const hashed = bcrypt.hashSync(password, 8);

    try {
        const user = await User.create({
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

// @desc    Account login
// @route   POST /v1/auth/login
exports.login = async (req, res) => {
    try {
        let user;

        if (req.body.username) {
            user = await User.findOne({ username: req.body.username }).select(
                '+password'
            );
        }

        if (!user) {
            return res.status(404).send('User not found');
        }

        // password validation
        let match = bcrypt.compareSync(req.body.password, user.password);

        // return false if wrong password
        if (!match)
            return res
                .status(401)
                .send({ auth: false, token: null, msg: 'Wrong password!' });

        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 86400
        });

        res.status(200).send({ auth: true, token, user });
    } catch (error) {
        console.log(error);
    }
};
