const uploadController = (req, res)=>{
    const file = req.files.myfile
    const fileUniqueId = `${uuid.v4()}${file.name}`
    const mypath = path.join(process.cwd(), 'storage', fileUniqueId)
    const writeStream = fs.createWriteStream(mypath)
    writeStream.write(file.data, (err)=>{
        if(!err){
            const fileModel = new FileModel({
                filename: file.name,
                uniqueid: fileUniqueId
            })
            fileModel.save()
            .then(dbres=>{
                res.send(JSON.stringify({
                    status:'ok',
                    data : dbres
                }))
            })
        }
    })  
}

const videosController = (req, res)=>{
    FileModel.find()
    .then(data=>{
        res.send(data)
        console.log(data);
    })
}

const videoController = function(req, res){
    const range = req.headers.range
    const videoPath = path.join(process.cwd(),'storage', req.query.name)
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

module.exports = {
    uploadController,
    videosController,
    videoController
}