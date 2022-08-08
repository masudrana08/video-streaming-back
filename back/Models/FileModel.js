const mongoose = require('mongoose')
const fileSchema = new mongoose.Schema({
    filename: String,
    uniqueid: String
})

const FileModel = new mongoose.model('File', fileSchema )

module.exports = {
    FileModel
}