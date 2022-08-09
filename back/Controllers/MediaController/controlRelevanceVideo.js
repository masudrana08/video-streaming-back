const MediaModel = require("../../Models/MediaModel");

const controlRelevanceVideo =  (req, res)=>{
  MediaModel.find()
  .then(data=>{
      res.send(data)
      console.log(data);
  })
}
module.exports = controlRelevanceVideo