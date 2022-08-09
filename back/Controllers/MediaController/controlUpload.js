const fs = require("fs");
const path = require('path')
const uuid = require('uuid');
const MediaModel = require("../../Models/MediaModel");

const controlUpload = (req, res)=>{
  const {title, category, tags} = req.body
  const mytitle = title.toLowerCase().split(' ')
  const videoFile = req.files.video
  const thumbnailFile = req.files.thumbnail
  const videoId = `${uuid.v4()}${videoFile.name}`
  const videoPath = path.join(process.cwd(), 'storage','video', videoId)
  const videoStream = fs.createWriteStream(videoPath)

  const thumbnailId = `${uuid.v4()}${thumbnailFile.name}`
  const thumbnailPath = path.join(process.cwd(), 'storage','thumbnail', thumbnailId)
  const thumbnailStream = fs.createWriteStream(thumbnailPath)
  videoStream.write(videoFile.data, (err)=>{
      if(!err){
          thumbnailStream.write(thumbnailFile.data, (thumbErr)=>{
              if(!thumbErr){
                  const mediaModel = new MediaModel({
                      videoName: videoFile.name,
                      videoId,
                      thumbnailId,
                      title: mytitle,
                      category,
                      tags: tags.split(',').map(i=>i.trim().toLowerCase()).slice(0,5),
                      uploader: req.user.id
                  })
                  mediaModel.save()
                  .then(dbres=>{
                      res.send(JSON.stringify({
                          status:'ok',
                          data : dbres
                      }))
                  })
              }
          })
      }
  })  
}


module.exports = controlUpload