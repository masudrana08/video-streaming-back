const fs = require("fs");
const path = require('path')
const uuid = require('uuid');
const VideoModel = require("../../Models/VideoModel");

const controlUpload = (req, res)=>{
  const {title, category, tags} = req.body
  const {username} = req.user
  const videoFile = req.files.video
  const thumbnailFile = req.files.thumbnail
  const videoId = `${uuid.v4()}${videoFile.name}`
  const videoPath = path.join(process.cwd(), 'storage','video', videoId)
  const videoStream = fs.createWriteStream(videoPath)

  const thumbnailId = `${uuid.v4()}${videoFile.name}`
  const thumbnailPath = path.join(process.cwd(), 'storage','video', thumbnailId)
  const thumbnailStream = fs.createWriteStream(thumbnailPath)
  videoStream.write(videoFile.data, (err)=>{
      if(!err){
          thumbnailStream.write(thumbnailFile.data, (thumbErr)=>{
              if(!thumbErr){
                  const videoModel = new VideoModel({
                      videoName: videoFile.name,
                      videoId,
                      thumbnailId,
                      title,
                      category,
                      tags,
                      uploader: username
                  })
                  videoModel.save()
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