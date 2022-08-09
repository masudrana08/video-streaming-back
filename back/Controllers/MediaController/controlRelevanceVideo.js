const VideoModel = require("../../Models/VideoModel");

const controlRelevanceVideo =  (req, res)=>{
  VideoModel.find()
  .then(data=>{
      res.send(data)
      console.log(data);
  })
}
module.exports = controlRelevanceVideo