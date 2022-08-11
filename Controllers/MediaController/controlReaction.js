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
      res.send(JSON.stringify({status:'ok'}))
    })
    .catch(err=>{
      res.status(500).send(JSON.stringify({status:'Something Wrong'}))
    })
    }
  }

module.exports = controlReaction