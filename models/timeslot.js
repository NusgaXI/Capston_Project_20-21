const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const timeslotSchema = new Schema({
    startAt: {
        type: Date,
        require: true
    },
    endAt: {
        type: Date,
        require: true
    },
    status: {
        type: String,
        require: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Timeslot', timeslotSchema);
