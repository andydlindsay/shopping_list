const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define model
const listSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.']
    },
    category: {
        type: String
    },
    ownerAddOnly: {
        type: Boolean,
        default: true
    },
    billSplitting: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    owner: {
        username: {
            type: String
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        ts: {
            type: Date,
            default: Date.now
        }
    },
    editedBy: {
        username: {
            type: String
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        ts: {
            type: Date,
            default: Date.now
        }
    },
    items: [{
        item: {
            type: String,
            required: true
        },
        qty: {
            type: Number
        },
        purchased: {
            type: Boolean,
            default: false
        },
        purchasedBy: {
            username: {
                type: String
            },
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            ts: {
                type: Date,
                default: Date.now
            }
        },
        createdBy: {
            username: {
                type: String
            },
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            ts: {
                type: Date,
                default: Date.now
            }
        },
        editedBy: {
            username: {
                type: String
            },
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            ts: {
                type: Date,
                default: Date.now
            }
        }
    }],
    members: [{
        member: {
            username: {
                type: String
            },
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            ts: {
                type: Date,
                default: Date.now
            }
        },
        pending: {
            type: Boolean,
            default: true
        },
        active: {
            type: Boolean,
            default: false
        },
        amountOwing: {
            type: Number,
            default: 0
        },
        percentage: {
            type: Number
        }
    }],
    messages: [{
        message: {
            type: String
        },
        username: {
            type: String
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        ts: {
            type: Date,
            default: Date.now
        }
    }],
    shoppingTrips: [{
        username: {
            type: String
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        ts: {
            type: Date,
            default: Date.now
        },
        cost: {
            type: Number
        },
        hasBeenSplit: {
            type: Boolean,
            default: false
        }
    }]
});

// export model
const List = module.exports = mongoose.model('list', listSchema);
