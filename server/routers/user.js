const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/register', async (request, response) => {
    const { user_email, user_password } = request.body;

    console.log('request body:', request.body);

    let user = await User.findOne({ user_email });

    if (user) {
        return response
            .status(400)
            .send(
                'A user with the provided email address already exists in the system'
            );
    }

    try {
        user = new User(request.body);
        user.user_password = await bcrypt.hash(user_password, 8);

        await user.save();
        response.status(201).send();
    } catch (error) {
        response
            .status(500)
            .send('Something went wrong. Please try again later');
    }
});

router.post('/login', async (request, response) => {
    try {
        const user = await User.findOne({
            user_email: request.body.user_email,
        });

        if (!user) {
            return response
                .status(400)
                .send('No user exists with the provided email');
        }

        const isMatch = await bcrypt.compare(
            request.body.user_password,
            user.user_password
        );

        if (!isMatch) {
            return response.status(400).send('Invalid credentials');
        }

        const { user_password, ...rest } = user.toObject();

        return response.send(rest);
    } catch (error) {
        return response
            .status(500)
            .send('Something went wrong. Please try again later');
    }
});

module.exports = router;
