const express = require('express')
const { uploadController, videoController, videosController } = require('../../Controllers/UserController/UserController');
const router = express.Router()

router.post('/upload', uploadController)
router.get('/videos', videosController)
router.get('/video', videoController)

module.exports = router