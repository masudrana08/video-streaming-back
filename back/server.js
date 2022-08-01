const express = require("express");
const app = express();
const fs = require("fs");
const path = require('path')
const cors = require('cors')
const fileupload = require('express-fileupload')
const uuid = require('uuid')
const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    filename: String,
    uniqueid: String
})

const myModel = new mongoose.model('File', fileSchema )

app.use(cors())
app.use(fileupload())
app.use(express.json())
app.post('/upload', (req, res)=>{
    const file = req.files.myfile
    const fileUniqueId = `${uuid.v4()}${file.name}`
    const mypath = path.join(process.cwd(), 'storage', fileUniqueId)
    const writeStream = fs.createWriteStream(mypath)
    writeStream.write(file.data, (err)=>{
        if(!err){
            const fileModel = new myModel({
                filename: file.name,
                uniqueid: fileUniqueId
            })
            fileModel.save()
            .then(dbres=>{
                res.send(dbres)
            })
        }
    })

    
})

app.get('/videos', (req, res)=>{
    myModel.find()
    .then(data=>{
        res.send(data)
        console.log(data);
    })
})

app.get('/video', function(req, res){
    
    const range = req.headers.range
    const videoPath = path.join(__dirname,'storage', req.query.name)
    const videoSize = fs.statSync(videoPath).size
    const chunkSize = 10**6
    const start = Number(range.replace(/\D/g, ''))
    const end = Math.min(start+chunkSize, videoSize-1)
    const contentLength = end -start + 1
    const headers = {
        'Content-Range' : `bytes ${start}-${end}/${videoSize}`,
        'Content-Type' : 'video/mp4',
        'Accept-Ranges' : 'bytes',
        'Content-Length': contentLength
     }
    res.writeHead(206, headers)
     const videoStream = fs.createReadStream(videoPath, {start, end})
     videoStream.pipe(res)
})
app.listen(8000, function () {
    console.log("Listening on port 8000!");
});

mongoose.connect('mongodb://localhost:27017/streaming', ()=>{
    console.log('Database  Connected');
})