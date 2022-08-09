const express = require('express')
const fs = require("fs");
const path = require('path')
const uuid = require('uuid');
const { uploadController, videoController, videosController } = require('../../Controllers/UserController');
const FileModel  = require('../../Models/FileModel');
const router = express.Router()

router.post('/upload', uploadController)
router.get('/videos', videosController)
router.get('/video', videoController)

module.exports = router