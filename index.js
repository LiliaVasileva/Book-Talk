const express = require("express");
const routers = require('./routes');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const {authentication } = require('./middlewares/authMiddleware');


const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',

}));

app.set('view engine', 'hbs');


app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authentication);
app.use(routers);

// TODO database name:
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/books');

app.listen(3000, () => console.log("Server is listening on port 3000 ..."))