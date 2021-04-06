const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Booking {
    _id: ID!
    timeslot: Timeslot!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Timeslot {
    _id: ID!
    startAt: String!
    endAt: String!
    status: String!
    creator: User!
}

type User {
    _id: ID!
    NetID: String!
    fullName: String!
    email: String!
    NetPassword: String
    role: String!
    createdTimeslots: [Timeslot!]
}

type AuthData {
    userId: ID!
    role: String!
    fullName: String!
    token: String!
    tokenExpiration: Int!
}

input TimeslotInput {
    startAt: String!
    endAt: String!
}

input UserInput{
    NetID: String!
    fullName: String!
    email: String!
    NetPassword: String!
    role: String!
}

type RootQuery {
    searchUsers(fullname: String): [Timeslot!]!
    users: [User!]!
    timeslots: [Timeslot!]!
    bookings: [Booking!]!
    login(NetId: String!, password: String!): AuthData!
}

type RootMutation {
    createTimeslot(timeslotInput: TimeslotInput): Timeslot
    cancelTimeslot(timeslotId: ID!): Boolean
    createUser(userInput: UserInput): User
    bookTimeslot(timeslotId: ID!): Booking!
    cancelBooking(bookingId: ID!): Boolean
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)