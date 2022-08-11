const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    tempPinHash: String,
    searches:Array,
    subscribers: Array,
    subscribed: Array, // username[]
    watchLater: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Media'
    } 
})

const UserModel = new mongoose.model('User', UserSchema )

module.exports = UserModel