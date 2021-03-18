const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    NetID: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    NetPassword: {
        type: String,
        required: true
    },
    role: { 
        type: String,
        required: true
    },
    createdTimeslots:[ {
            type: Schema.Types.ObjectId,
            ref: 'Timeslot'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);