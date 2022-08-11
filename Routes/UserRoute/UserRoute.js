const express = require('express')
const controlSubscribe = require('../../Controllers/UserController/controlSubscribe')
const { controlSendVerification, controlConfirmVerificaiton } = require('../../Controllers/UserController/controlVerification')
const { controlAddWatchLater, controlWatchLater, controlRemoveWatchLater } = require('../../Controllers/UserController/controlWatchLater')
const router = express.Router()

router.get('/subscribe', controlSubscribe)
router.get('/send-verification', controlSendVerification)
router.post('/confirm-verification', controlConfirmVerificaiton)
router.get('/add-watch-later', controlAddWatchLater)
router.get('/watch-later', controlWatchLater)
router.get('/remove-watch-later', controlRemoveWatchLater)

module.exports = router