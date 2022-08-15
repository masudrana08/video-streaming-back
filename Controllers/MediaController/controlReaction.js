const MediaModel = require("../../Models/MediaModel")
const uniqueArray = require("../../Utilities/uniqueArray")

const controlReaction = (req, res) =>{
  const {type, videoId } = req.body
  if(req.user && req.user.username){
    MediaModel.findOne({videoId})
    .then(dbres=>{
      // const reactions = [...dbres.like, ...dbres.unlike]
      // if(reactions.indexOf(req.user.username)<0){
       
      // }
      if(type=='like'){
        dbres.like = uniqueArray([...dbres.like, req.user.username])
        dbres.unlike = dbres.unlike.filter(i=>i != req.user.name)
        dbres.save()
      }
      if(type=='unlike'){
        dbres.unlike = uniqueArray([...dbres.unlike, req.user.username])
        dbres.like = dbres.like.filter(i=>i != req.user.name)
        dbres.save()
      }
      res.status(200)
    })
    .catch(err=>{
      res.status(400).json({
        message: err.message
      })
    })
    }
  }

module.exports = controlReaction