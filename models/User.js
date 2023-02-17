const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [4, 'Username should be at least 4 chars long!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email should be at least 10 chars long!']
    }, 
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [3, 'Password should be at least 3 chars long!']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;