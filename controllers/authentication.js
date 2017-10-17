const jwt = require('jwt-simple');
const User = require('../models/user');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    // sub is the subject of the token; iat is issued at time
    return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET_STRING);
}

exports.signin = function(req, res, next) {
    // user has already been authorized, they need a token
    res.send({ token: tokenForUser(req.user) });
}

exports.signup = (req, res, next) => {
    
    // pull data out of request body
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ success: false, error: 'You must provide email and password' });
    }

    // see if a user with the given email already exists
    User.findOne({ email }, (err, existingUser) => {

        // check if an error is returned
        if (err) { return next(err); }

        // if a user with email does exist, return error
        if (existingUser) {
            // res code 422 means unprocessable entity
            return res.status(422).send({ success: false, error: 'Email is in use' });
        }

        // if a user with email doesn't exist, create user record
        const user = new User({ email, password });

        // save the record to the database
        user.save((err) => {
            // check if an error is returned
            if (err) { return next(err); }

            // respond to request indicating that user was created
            res.json({ token: tokenForUser(user) });

        });

    });

}
