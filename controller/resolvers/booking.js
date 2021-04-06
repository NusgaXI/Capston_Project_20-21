const Timeslot = require('../../models/timeslot');
const Booking = require('../../models/booking');
const { transformBooking } = require('./merge');


module.exports = {
    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unathenticated!');
        }
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking);
            });
        } catch (err) {
            throw err;
        }
    },

    bookTimeslot: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unathenticated!');
        }
        const fetchedTimeslot = await Timeslot.findOne({_id: args.timeslotId});
        const checkstatus = await fetchedTimeslot.status;
        if (checkstatus == "Booked") {
            throw new Error('This Timslot have been booked.');
        };
        await fetchedTimeslot.update({status: "Booked"});
        const booking = new Booking({
            user: req.userId,
            timeslot: fetchedTimeslot
        });
        const result = await booking.save();
        return transformBooking(result);
    },
    
    cancelBooking: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unathenticated!');
        }
        try {
            const booking = await Booking.findById(args.bookingId).populate('timeslot');
            await booking.timeslot.update({status: "Available"});
            await Booking.deleteOne({_id: args.bookingId});
        } catch (err) {
            throw err;
        }
    }
};