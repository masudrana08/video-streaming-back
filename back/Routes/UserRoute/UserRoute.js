const express = require('express')
const controlSubscribe = require('../../Controllers/UserController/controlSubscribe')
const controlVerify = require('../../Controllers/UserController/controlVerify')
const router = express.Router()

router.get('/subscribe', controlSubscribe)
router.post('/verify', controlVerify)

module.exports = router