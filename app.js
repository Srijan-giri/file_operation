const express = require('express')
const app = express();
const path = require('path');
const { fileHandleError } = require('./helper/errorHandler');
const fileRouter = require('./routes/fileRoutes');
const userRouter = require('./routes/userRoutes');
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1 // 1 day
    }
}));

app.set("views", path.resolve("./views/"));
app.set('view engine', 'ejs');

// middleware

app.use(express.json()); // parsion json object
app.use(express.urlencoded({ extended: false })); // parsion url encoded data
app.use(bodyParser.json());
app.use(fileHandleError);


app.use('/', fileRouter);
app.use('/', userRouter);

module.exports = app;