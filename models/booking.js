const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
    {
        timeslot: {
            type: Schema.Types.ObjectId,
            ref: 'Timeslot'
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);