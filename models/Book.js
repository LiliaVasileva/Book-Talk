const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minLength: [2, 'Title should be at least 2 chars long!']
    },
    author: {
        type: String, 
        required: true,
        minLength: [5, 'Author should be at least 5 chars long!']
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//,

    },
    review: {
        type: String,
        required: true,
        minLength: [10, 'The Review should be a minimum of 10 characters long.']

    },
    genre: {
        type: String,
        required: true,
        minLength: [3, 'Genre should be at least 3 chars long!']
    },
    stars: {
        type: Number,
        required: true,
        min: [1, 'Stars should be positive number between 1 and 5!'],
        max: [5, 'Stars should be positive number between 1 and 5!']
    },
    wishList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;