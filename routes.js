const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const bookController = require('./controllers/bookController')
const profileController = require('./controllers/profileController')


router.use(homeController);
router.use(authController);
router.use(profileController);
router.use('/book', bookController);


router.use('*', (req, res) => {
    res.render('home/404')
})

module.exports = router;