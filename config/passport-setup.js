const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

// 19/4/21 Add id field to user model - store user id once collected.

// Store user id in the session so we can get user data.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Recover user data using the serialised ID
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

// Set up passport for strategies
// Google Strategy including callback url

passport.use(
    new GoogleStrategy({
        // API Access keys and callback URL matching oauth setup
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    },
        (accessToken, refreshToken, profile, done) => {
            // passport callback function

            User.findOne({ id: profile.id })
                .then((currentUser) => {
                    if (currentUser) {
                        //User found
                        console.log('User is', currentUser);
                        done(null, currentUser);
                    } else {
                        new User({
                            id: profile.id,
                            name: profile.displayName,
                            email: profile.email
                        }).save().then((newUser) => {
                            console.log('Created new user', newUser);
                            done(null, newUser);
                        });
                    }
                });
        }

    )
);