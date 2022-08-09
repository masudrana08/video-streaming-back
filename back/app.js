require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors')
const fileupload = require('express-fileupload')
const mongoose = require('mongoose')
const MediaRoute = require('./Routes/MediaRoute/MediaRoute')
const AuthRoute = require('./Routes/AuthRoute/AuthRoute');
const UserRoute = require('./Routes/UserRoute/UserRoute');
const whoIs = require('./Middleware/whois');
const PORT = process.env.PORT || 8000
app.use(cors())
app.use(fileupload())
app.use(express.json())


app.use('/auth', AuthRoute)
app.use('/media', whoIs, MediaRoute)
app.use('/user', whoIs, UserRoute)

app.listen(PORT, function () {
    console.log("Listening on port "+PORT);
});

mongoose.connect('mongodb://localhost:27017/streaming', ()=>{
    console.log('Database  Connected');
})