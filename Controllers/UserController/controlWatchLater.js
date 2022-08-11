const UserModel = require("../../Models/UserModel")

// ============ Add for Watch Later ============ //
const controlAddWatchLater = (req, res) => {
  const {id} = req.query
  UserModel.findOne({username: req.user.username})
  .then(dbres=>{
    const watchList = dbres.watchLater
    watchList.unshift(id)
    dbres.watchLater = watchList
    dbres.save()
    .then(()=>{
      res.send(JSON.stringify({status:'Added for Watch Later'}))
    })
    .catch(err=>{
      console.log(err);
    })
  })
}

// ============ Watch Later List ============ //
const controlWatchLater = (req, res) => {
  const {id} = req.query
  UserModel.findOne({username: req.user.username}).populate('watchLater').select({watchLater: 1})
  .then(dbres=>{
    res.send(dbres.watchLater)
  })
}

// ============ Remove from Watch Later List ============ //
const controlRemoveWatchLater = (req, res) => {
  const {id} = req.query
  UserModel.findOne({username: req.user.username})
  .then(dbres=>{
    const watchList = dbres.watchLater.filter(i=>{
      return i+'' !== id
    })
    console.log(watchList);
    dbres.watchLater = watchList
    dbres.save()
    .then(()=>{
      res.send(JSON.stringify({status:'Removed from Watch Later List'}))
    })
    .catch(err=>{
      console.log(err);
    })
  })
}

module.exports = {
  controlAddWatchLater,
  controlWatchLater,
  controlRemoveWatchLater
}