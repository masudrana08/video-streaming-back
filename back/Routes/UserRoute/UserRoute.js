const express = require('express')
const controlSubscribe = require('../../Controllers/UserController/controlSubscribe')
const router = express.Router()

router.get('/subscribe', controlSubscribe)

module.exports = router