const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// set up options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.SECRET_STRING
};

// set up options for local strategy
const localOptions = {
    usernameField: 'email'
};

// create local strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    
    // verify the email and password are correct
    User.findOne({ email }, function(err, user) {

        // return if error
        if (err) { return done(err); }
        // if no user found, return with no user object
        if (!user) { return done(null, false); }
        // if a user is found, compare passwords
        user.comparePassword(password, function(err, isMatch) {

            // return if error
            if (err) { return done(err); }
            // if passwords do not match, return false
            if (!isMatch) { return done(null, false); }
            // if passwords match, call done with the user object
            return done(null, user);

        });

    });

});

// create jwt strategy
// payload is decoded jwt token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    
    // see if the user id in the payload exists in our database
    User.findById(payload.sub, function(err, user) {

        // return if error
        if (err) { return done(err, false); }        
        if (user) {
            // if it does, call done with that user object
            done(null, user);
        } else {
            // else, call done without a user object
            done(null, false);
        }

    });

});

// tell passport to use these strategies
passport.use(jwtLogin);
passport.use(localLogin);
