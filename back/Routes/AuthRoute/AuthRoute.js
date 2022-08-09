const express = require('express')
const { controlSignup, controlSignin } = require('../../Controllers/AuthController/AuthController')
const router = express.Router()


router.post('/signup', controlSignup)
router.post('/signin', controlSignin)

module.exports = router