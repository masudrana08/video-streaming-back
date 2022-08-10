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
    searches:Array,
    subscribers: Array,
    subscribed: Array, // username[]
    watchLater: Array // videoId[]
})

const UserModel = new mongoose.model('User', UserSchema )

module.exports = UserModel