require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors')
const fileupload = require('express-fileupload')
const mongoose = require('mongoose')
const StreamRoute = require('./Routes/StreamRoute/StreamRoute')
const AuthRoute = require('./Routes/AuthRoute/AuthRoute')
const PORT = process.env.PORT || 8000
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(fileupload())
app.use(express.json())

app.use((req,res, next)=>{
    const token = req.headers.token
    if(token){
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE)
        req.user = decoded
        next()
    }
})
app.use('/auth', AuthRoute)
app.use('/stream', StreamRoute)

app.listen(PORT, function () {
    console.log("Listening on port "+PORT);
});

mongoose.connect('mongodb://localhost:27017/streaming', ()=>{
    console.log('Database  Connected');
})