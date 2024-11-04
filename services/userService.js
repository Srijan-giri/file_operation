const { User } = require('../models/');

const createUser = async (userData) => {
    try {
        console.log("User Data:", userData);
        const user = await User.create(userData);

        if (!user) {
            throw new Error('User creation failed');
        }
        console.log("User created successfully");

        return user;
    }
    catch (err) {
        console.log("Error: " + err);
    }
}

module.exports = { createUser };