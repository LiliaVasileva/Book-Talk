const { isAuth } = require('../middlewares/authMiddleware');
const router = require('express').Router();
const { getErrorMessage } = require('../utils/errorUtils');
const bookService = require('../services/bookService');



router.get('/create', (req, res) => {
    res.render('book/create');
});


router.post('/create',isAuth, async (req, res) => {
    const { title, author, genre, stars, image, review } = req.body;

    const userId =req.user._id;

    try {
        await bookService.create(userId, {title, author, genre, stars, image, review });

    }catch (error) {

        return res.status('404').render('book/create', {error: getErrorMessage(error)});
    }

    res.redirect('/book/catalog');


});

router.get('/catalog', async(req, res) => {

    const books = await bookService.getAllBooks();

    res.render('book/catalog', { books });
})

module.exports =router;