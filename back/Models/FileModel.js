const mongoose = require('mongoose')
const fileSchema = new mongoose.Schema({
    filename: String,
    uniqueid: {
        type: String,
        required: true
    }
})

const FileModel = new mongoose.model('File', fileSchema )

module.exports = FileModel