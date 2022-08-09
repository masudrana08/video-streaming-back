const MediaModel = require("../../Models/MediaModel");

const controlRelevanceVideo =  async(req, res)=>{
  if(!req.user){
    MediaModel.find({}).populate('uploader').sort({createdAt: -1}).limit(30)
    .then(data=>res.send(data))
    console.log('not user');
  }
  if(req.user){
    console.log('user');
    const totalCount = await MediaModel.countDocuments({subscribers: {$in : [req.user.username]}})
    if(totalCount<11){
      // Randomize
      MediaModel.find({}).populate('uploader').sort({createdAt: -1}).limit(30)
      .then(data=>{
        res.send(data)
        console.log(data, 'alldata');
      })
    }else{
      MediaModel.populate('uploader').find({subscribers: {$in : [req.user.username]}}).sort({createdAt: -1}).limit(100)
      .then(data=>{
        res.send(data)
        console.log(data, 'relevance data');
      })
    }
  }
 
}
module.exports = controlRelevanceVideo

 // check user relevance
        // if NOT relevance then show latest 30 video
          // then create relevance for user
        // if Relevance
          // then show relevance data
        
        