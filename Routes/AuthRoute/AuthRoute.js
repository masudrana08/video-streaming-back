const express = require('express')
const controlSignin = require('../../Controllers/AuthController/controlSignin')
const controlSignup = require('../../Controllers/AuthController/controlSignup')
const router = express.Router()


router.post('/signup', controlSignup)
router.post('/signin', controlSignin)

module.exports = router