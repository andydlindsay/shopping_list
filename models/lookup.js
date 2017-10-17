const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define model
const lookupSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.']
    },
    contents: [{
        itemFullName: {
            type: String
        },
        itemShortForm: {
            type: String
        }
    }]
});

// export model
const Lookup = module.exports = mongoose.model('lookup', lookupSchema);
