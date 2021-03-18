const Timeslot = require('../../models/timeslot');
const User = require('../../models/user');
const { transformTimeslot } = require('./merge');

module.exports = {
    timeslots: async () => {
        try{
            const timeslots = await Timeslot.find();
            return timeslots.map(timeslot =>{
                return transformTimeslot(timeslot);
            });
        } catch(err) {
            throw err;
        }
    },

    createTimeslot: async (args, req) => {

        const timeslot = new Timeslot({
            startAt: new Date(args.timeslotInput.startAt),
            endAt: new Date(args.timeslotInput.endAt),
            status: "Available",
            creator: req.userId,
        });
        let createdTimeslot;
        try{
            const result = await timeslot.save();
            createdTimeslot = transformTimeslot(result);
            const creator = await User.findById(req.userId)

            if (!creator) {
                throw new Error('User not found.');
            }
            creator.createdTimeslots.push(timeslot);
            await creator.save();
            return createdTimeslot;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    cancelTimeslot: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unathenticated!');
        }
        try {
            const checkTimeslot = await Timeslot.findOne({_id: args.timeslotId});
            if (!checkTimeslot) {
                throw new Error('No this Timslot.');
            }
            await Timeslot.deleteOne({_id: args.timeslotId});
        } catch (err) {
            throw err;
        }
    }
};