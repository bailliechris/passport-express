const express = require('express');
const router = express.Router();
const {checkSession} = require('../util/check');

// Welcome Page
router.get('/',  (req, res) => {
    res.send("I live but you're not logged in!")
});

router.get('/profile', checkSession, (req, res) => {
    res.send(req.session.user);
})

router.get('/foo', checkSession, (req, res) => {
    res.send("You made it to a protected route");
})


module.exports = router;