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
const logError = require('./Middleware/logError');
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(fileupload())
app.use(express.json())

app.use('/auth', AuthRoute)
app.use('/media', whoIs, MediaRoute)
app.use('/user', whoIs, UserRoute)

app.use(logError)
app.listen(PORT, function () {
    console.log("Listening on port "+PORT);
});

mongoose.connect(process.env.DB, ()=>{
    console.log('Database  Connected');
})
