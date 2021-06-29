const express = require('express');
const router = express.Router();
const passport = require('passport');
const ClassList = require('../models/classlists');

// auth login page
router.get('/login', (req, res) => {
    res.send('Login options here!');
});

// auth with google
router.get('/google', passport.authenticate('google', {
    // Add more scope options?!
    scope:['profile email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    req.session.user = req.user;
    console.log(req.user);
    // Get user data and classes - split here and return
    // Refactor into separate file
    ClassList.find({ ownerid: req.user._id }, (err, docs) => {
        let classlists = [];

        // Extract classes from the returned documents
        if (docs.length > 0) {
            classlists = docs.map(c => {
                return {
                    name: c.name,
                    pupils: c.pupils
                }
            });
        }

        let data = {
            user: req.user.name,
            _id: req.user._id,
            classes: classlists
        }

        console.log("Data to be returned", data);

        res.send(data);
    });
    //res.redirect('/profile');
});

// logout
router.get('/logout', (req, res) => {
    let name = req.session.user.name;
    req.session.destroy();
    res.send("Logged Out: " + name);
});

module.exports = router;