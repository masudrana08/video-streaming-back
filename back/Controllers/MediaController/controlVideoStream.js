const fs = require("fs");
const path = require('path')

const controlVideoStream = function(req, res){
  const range = req.headers.range
  const videoPath = path.join(process.cwd(),'storage','video', req.query.name)
  const videoSize = fs.statSync(videoPath).size
  const chunkSize = 10**6
  const start = Number(range.replace(/\D/g, ''))
  const end = Math.min(start+chunkSize, videoSize-1)
  const contentLength = end -start + 1
  const headers = {
      'Content-Range' : `bytes ${start}-${end}/${videoSize}`,
      'Content-Type' : 'video/mp4',
      'Accept-Ranges' : 'bytes',
      'Content-Length': contentLength
   }
  res.writeHead(206, headers)
   const videoStream = fs.createReadStream(videoPath, {start, end})
   videoStream.pipe(res)
}
module.exports = controlVideoStream