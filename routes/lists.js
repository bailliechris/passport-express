const express = require('express');
const router = express.Router();
// Load Models
const User = require('../models/user');
const ClassList = require('../models/classlists');
// Load middleware
const {checkSession, checkAdmin} = require('../util/check');

// Show all classes stored
router.get('/', checkSession, (req, res) => {
    ClassList.find({}, (err, docs) => {
        res.send(docs); 
    });

    //res.send(result);
});

// Find a specific users classes
router.post('/classes', checkSession, (req, res) => {
    ClassList.find({ownerid: req.body.id}, (err, docs) => {
        res.send(docs); 
    });

    //res.send(result);
});

// Add a new classlist and update the user with classlist
router.post('/add', checkSession, (req, res) => {
    var newList = new ClassList({
        ownerid: req.body.id,
        name: req.body.name,
        pupils: req.body.pupils
    });
    newList.save().then(user => {
        res.send(user);
    }, (e) => { // Server error when updating database
        res.status(400).send(e);
    });
});

module.exports = router;