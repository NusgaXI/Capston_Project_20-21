const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const { transformUser,transformTimeslot } = require('./merge');

module.exports = {
    searchUsers: async ({fullname}) => {
        try {
            const users = await User.findOne({ fullName : fullname }).populate('createdTimeslots');

            const timeslotLists = users.createdTimeslots;
  

            return timeslotLists.map(timeslotList => {
                return transformTimeslot(timeslotList);
            })
            ;
            } catch (err) {
                throw err;
            }
    },
 
    users: async (args, req) => {
        try {
            const users = await User.find();
            return users.map(user => {
                return transformUser(user);
            });
        } catch (err) {
            throw err;
        }
    },
    createUser: args =>{
        return User.findOne({NetID: args.userInput.NetID}).then(user => {
            if (user) {
                throw new Error('User exists already.')
            }
            return bcrypt.hash(args.userInput.NetPassword, 12);
        })
        .then(hashedPassword => {
            const user = new User({
                NetID: args.userInput.NetID,
                fullName: args.userInput.fullName,
                email: args.userInput.email,
                NetPassword: hashedPassword,
                role: args.userInput.role,
            });
            return user.save();
        })
        .then(result => {
            return { ...result._doc, password: null, _id: result.id }
        })
        .catch(err => {
            throw err;
        });
    },
    login: async ({NetId, password}) => {
        const user = await User.findOne({NetID: NetId});
        if (!user) {
            throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.NetPassword);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }
        const token = jwt.sign({userId: user.id, NetId: user.NetID}, 'somesupersecretkey', {expiresIn: '1h'});
        return { userId: user.id, role: user.role, fullName: user.fullName, token: token, tokenExpiration: 1 }
    }
};