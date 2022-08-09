const MediaModel = require("../../Models/MediaModel")

const controlSearch = (req, res) => {
  const {key} = req.query
  const arrayOfKey = key.toLowerCase().split(' ')
  // MediaModel.find({title: {$in:arrayOfKey}})
  MediaModel.find({$or: [{title: {$in:arrayOfKey}}, {tags: {$in:arrayOfKey}}]})
  .then(dbres=>{
    res.send(dbres)
  })
}

module.exports = controlSearch