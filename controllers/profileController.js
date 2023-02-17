const { isAuth } = require('../middlewares/authMiddleware');
const router = require('express').Router();
const bookService =require('../services/bookService');



router.get('/profile', isAuth, async (req, res) => {
    
    const user = req.user;

    const books = await bookService.getWishedBooks(user._id);

    res.render('profile', {user,books})
})

module.exports = router;