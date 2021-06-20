// 20.1.21 - Register tested / Reseting password soon?
// ../users

const express = require('express');
const uuid = require('uuid');
//import { v4 as uuidv4 } from 'uuid';
const router = express.Router();
// Load User model
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {checkSession, checkAdmin} = require('../util/check');
const saltRounds = 10;

// Testing that the data can be found
router.post('/test', (req, res) => {
    //MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});
    User.findOne({email:req.body.email}, function(err, user)
    {
        console.log(user);
        if(user) {
            // User exists - don't create a new one!
            res.send("User email already exists");
            
        } 
        else {
            res.send("No match to this user email");
        }
    });
});

// Login Page Response
router.post('/login', (req, res) => {
    console.log(req.body);

    User.findOne({user:req.body.name})
    .then(user => {
        if(user) {
            bcrypt.compare(req.body.pw, user.pw, function(err, result) {
                if (result === true) {
                    let data = {
                        user: user.name,
                        _id: user._id
                    }
                    // Return results on success
                    req.session.user = user;
                    res.send(data);
                }
                else {
                    //Failed to match password
                    res.status(404).send();
                }
              });
        }
        else {
            // No username match - abort
            res.status(404).send();
        }
    })
    .catch((e) => {      
        // Error - send error code
        res.status(400).send(e);    
     });
});

// Register Users
router.post('/register', (req, res) => {
    // Check details before creating the user
    // Are the matching variable names causing an issue here?
    const { name, email, pw } = req.body;
    let errors = [];
  
    if (!name || !email || !pw ) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (pw.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.send({
        errors,
        name,
        email,
        pw
      });
    }
    else
    {
        // Check if email address exists in user DB
        User.findOne({email:req.body.email}, function(err, user)
        {
            if(user) {
                // User exists - don't create a new one!
                res.send("User already exists");
            }
            else {
                // Create new user
                // Hash and Salt the Password before sending to DB
                // Create new user
                bcrypt.hash(req.body.pw, saltRounds, function(err, hash) {
                    var newUser = new User({
                        id: uuid.v4(),
                        name: req.body.name,
                        pw: hash,
                        email: req.body.email
                    });
                    newUser.save().then(user => {
                        res.send(user);
                    }, (e) => { // Server error when updating database
                        res.status(400).send(e);
                    });
                });
            }
        }
    )}
});

// Protected route - check with session
router.get('/foo', checkSession, (req, res) => {
    res.send("You're still logged in!" + req.session.user.name);
});

// Protected Admin route
router.get('/bar', checkAdmin, (req, res) => {
    res.send("Admin user access success.");
});

// Logout
router.get('/logout', (req, res) => {
    let name = req.session.user.name;
    req.session.destroy();
    res.send("Logged Out: " + name);
});

module.exports = router;