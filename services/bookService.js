const Book = require('../models/Book');



exports.create = (userId, {title, author, genre, stars, image, review }) => Book.create({title, author, image, review, genre, stars, owner: userId});

exports.getAllBooks = () => Book.find({}).lean();

exports.getBook = (bookId) => Book.findById(bookId).lean();

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

exports.edit = (bookId, {title, author, image, review, genre, stars}) => Book.findByIdAndUpdate(bookId, {title, author, image, review, genre, stars}, {runValidators: true});

exports.wishes = async (userId, bookId) => {

    const book = await Book.findById(bookId);

    book.wishList.push(userId);

    return book.save();
}


exports.getWishedBooks = async (userId) => {

    const allBooks = await Book.find({}).lean();
    const books = [];

    function findUserId(book) {

        if (book.wishList?.some((id) => id == userId)){
            books.push(book);
        }
        
    }

    allBooks.forEach(findUserId);

    return books
} 