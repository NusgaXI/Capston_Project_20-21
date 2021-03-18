const authResolver = require('./auth');
const timeslotResolver = require('./timeslot');
const bookingResolver = require('./booking');

const rootResolver = {
    ...authResolver,
    ...timeslotResolver,
    ...bookingResolver
};

module.exports = rootResolver;