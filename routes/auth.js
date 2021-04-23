const express = require('express');
const router = express.Router();
const passport = require('passport');

// auth login page
router.get('/login', (req, res) => {
    res.send('Login here!')
});

// auth with google
router.get('/google', passport.authenticate('google', {
    // Add more scope options?!
    scope:['profile email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    req.session.user = req.user;
    res.redirect('/profile');
});

// logout
router.get('/logout', (req, res) => {
    let name = req.session.user.name;
    req.session.destroy();
    res.send("Logged Out: " + name);
});

module.exports = router;