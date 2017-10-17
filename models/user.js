const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// define our model
const userSchema = new Schema({
    username: {
        type: String,
        maxlength: [25, 'Username must be 25 characters or less.'],
        minlength: [4, 'Username must be at least 4 characters long.'],
        match: /^[a-zA-Z0-9]+$/,
        required: [true, 'Username is required.']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Email is required.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    ts: {
        type: Date,
        default: Date.now
    }
});

// on save hook, encrypt password
userSchema.pre('save', function(next) {
    const user = this;
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        // if error, return early
        if (err) { return callback(err); }
        // otherwise, return isMatch value
        callback(null, isMatch);
    });
};

// export model
const User = module.exports = mongoose.model('user', userSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};
