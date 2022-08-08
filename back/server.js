const express = require("express");
const app = express();
const cors = require('cors')
const fileupload = require('express-fileupload')
const mongoose = require('mongoose')
const StreamRoute = require('./Routes/StreamRoute/StreamRoute')



app.use(cors())
app.use(fileupload())
app.use(express.json())

app.use('/stream', StreamRoute)

app.listen(8000, function () {
    console.log("Listening on port 8000!");
});

mongoose.connect('mongodb://localhost:27017/streaming', ()=>{
    console.log('Database  Connected');
})