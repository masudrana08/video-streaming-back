const express = require('express')
const UserModel = require('../../Models/UserModel')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signupController, signinController } = require('../../Controllers/AuthController');

router.post('/signup', signupController)
router.post('/signin', signinController)

module.exports = router