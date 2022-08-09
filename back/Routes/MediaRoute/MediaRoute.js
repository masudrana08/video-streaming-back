const express = require('express')
const { controlUpload, controlVideoStream, controlRelevanceVideo } = require('../../Controllers/MediaController/MediaController');
const router = express.Router()

router.post('/upload', controlUpload)
router.get('/video-stream', controlVideoStream)
router.get('/relevance', controlRelevanceVideo)

module.exports = router