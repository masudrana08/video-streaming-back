const express = require('express')
const controlSubscribe = require('../../Controllers/UserController/controlSubscribe')
const controlSendVerificationPin = require('../../Controllers/UserController/controlSendVerificationPin')
const confirmVerificaiton = require('../../Controllers/UserController/controlConfirmVerification')
const router = express.Router()

router.get('/subscribe', controlSubscribe)
router.get('/send-verification-pin', controlSendVerificationPin)
router.post('/confirm-verification', confirmVerificaiton)

module.exports = router