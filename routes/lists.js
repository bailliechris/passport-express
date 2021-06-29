const express = require('express');
const router = express.Router();
// Load Models
const User = require('../models/user');
const ClassList = require('../models/classlists');
// Load middleware
const db = require('../util/db');
const {checkSession, checkAdmin} = require('../util/check');

// Show all classes stored
router.get('/', checkSession, (req, res) => {
    ClassList.find({}, (err, docs) => {
        res.send(docs); 
    });

    //res.send(result);
});

// Find a specific users classes
router.post('/classes', checkSession, async (req, res) => {
    let docs = await db.getUserClasses(req.body.ownerid);

    res.send(docs);
});

// Add a new classlist and update the user with classlist
router.post('/add', checkSession, (req, res) => {
    let result = db.addNewClass(req.body.ownerid, req.body.name, req.body.pupils);

    if (result) {
        res.send({
            ownerid: req.body.ownerid,
            name: req.body.name,
            pupils: req.body.pupils
        });
    }
    else {
        res.send(false);
    }
});

module.exports = router;