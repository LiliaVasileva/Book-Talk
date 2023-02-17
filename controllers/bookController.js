const { isAuth } = require('../middlewares/authMiddleware');
const router = require('express').Router();
const { getErrorMessage } = require('../utils/errorUtils');
const bookService = require('../services/bookService');



router.get('/create', (req, res) => {
    res.render('book/create');
});


router.post('/create', isAuth, async (req, res) => {
    const { title, author, genre, stars, image, review } = req.body;

    const userId = req.user._id;

    try {
        await bookService.create(userId, { title, author, genre, stars, image, review });

    } catch (error) {

        return res.status('404').render('book/create', { error: getErrorMessage(error) });
    }

    res.redirect('/book/catalog');


});

router.get('/catalog', async (req, res) => {

    const books = await bookService.getAllBooks();

    res.render('book/catalog', { books });
});


router.get('/:bookId/details', async (req, res) => {

    const book = await bookService.getBook(req.params.bookId);

    const isOwner = book.owner == req.user?._id;

    const isWished = book.wishList?.some((id) => id == req.user?._id);

    res.render('book/details', { book, isOwner, isWished })

})

router.get('/:bookId/delete',isAuth, async (req, res) => {
    const bookId = req.params.bookId;

    try {
        await bookService.delete(bookId);
    } catch {
        res.status(404).redirect('home/404');
    }

    res.redirect('/book/catalog')
})


router.get('/:bookId/edit',isAuth, async (req, res) => {

    const book = await bookService.getBook(req.params.bookId);

    res.render('book/edit', { book })
});

router.post('/:bookId/edit',isAuth,  async (req, res) => {

    const bookId = req.params.bookId;
    const {title, author, genre, stars, image, review} = req.body;


    try {
        await bookService.edit(bookId, {title, author, image, review, genre, stars});

        res.redirect(`/book/${req.params.bookId}/details`)

    } catch (error){

        const book = await bookService.getBook(req.params.bookId);
        res.status(404).render('book/edit', {book: book, error: getErrorMessage(error)});
    }

    
});

router.get('/:bookId/wish', isAuth, async (req, res) => {

    await bookService.wishes(req.user._id, req.params.bookId);
    console.log('inside');

    res.redirect(`/book/${req.params.bookId}/details`);
})

module.exports = router;