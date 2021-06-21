// Load ENV Details
require('dotenv').config();

// Declare Variables
const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const parseurl = require('parseurl');

// Set up Mongoose Connection - pointing at specific colllection
var mongoose = require('mongoose');
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ssleague'
};

// body-parser middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Set up passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(mongoURI, mongoOptions);

// Set up session and store get session key from .env
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 4 * 60 * 60 * 1000
    }
}));

// Routes List
app.use('/', require('./routes/index'));
// App only users - register, login, fetch details
app.use('/users', require('./routes/users'));
// Class Lists
app.use('/lists', require('./routes/lists'));
// Google Passport users
app.use('/auth', require('./routes/auth'));

// Add catch all else routes + redirect to /
app.use(function (req, res) {
    let url = parseurl(req).pathname;

    res.status(404).send("Sorry can't find " + url);

    console.log("Requested Path", url);
});

// Start Server
app.listen(port, () => {
    console.log(`listening on port ${port}!`);
});