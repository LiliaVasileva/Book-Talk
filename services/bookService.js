const Book = require('../models/Book');



exports.create = (userId, {title, author, genre, stars, image, review }) => Book.create({title, author, image, review, genre, stars, owner: userId});

exports.getAllBooks = () => Book.find({}).lean();

exports.getBook = (bookId) => Book.findById(bookId).lean();

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);