const Timeslot = require('../../models/timeslot');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const timeslots = async timeslotIds =>{
    try{
        const timeslots = await Timeslot.find({_id: {$in: timeslotIds}});
        return timeslots.map(timeslot => {
            return transformTimeslot(timeslot);
        });
    } catch (err) {
        throw err;
    }
};


const singleTimeslot = async timeslotId => {
    try {
        const timeslot = await Timeslot.findById(timeslotId);
        return transformTimeslot(timeslot);
    } catch (err) {
        throw err;
    }
}

const user = userID =>{
    return User.findById(userID)
        .then(user => {
            return { ...user._doc, _id: user.id, createdTimeslots: timeslots.bind(this, user._doc.createdTimeslots)};
        })
        .catch(err => {
        throw err;
    }
    )
};

const transformTimeslot = timeslot => {
    return {
        ...timeslot._doc, 
        _id: timeslot.id, 
        startAt: dateToString(timeslot._doc.startAt),
        endAt: dateToString(timeslot._doc.endAt),
        creator: user.bind(this, timeslot.creator)
    };
};

const transformBooking = booking => {
    return {
        ...booking._doc, 
        _id: booking.id, 
        user: user.bind(this, booking._doc.user),
        timeslot: singleTimeslot.bind(this, booking._doc.timeslot),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }
}

const transformUser = user => {
    return {
        ...user._doc, 
        _id: user.id, 
        NetID: user._doc.NetID,
        fullName: user._doc.fullName,
        email: user._doc.email,
        role: user._doc.role,
        createdTimeslots: timeslots.bind(this, user._doc.createdTimeslots)
    }
}

exports.transformTimeslot = transformTimeslot;
exports.transformBooking = transformBooking;
exports.transformUser = transformUser;