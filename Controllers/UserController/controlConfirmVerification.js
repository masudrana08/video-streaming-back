const UserModel = require("../../Models/UserModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const confirmVerificaiton =  (req, res) => {
  const {pin} = req.body
  UserModel.findOne({username: req.user.username})
  .then(dbres=>{
    const isPinMatch = bcrypt.compareSync(pin, dbres.tempPinHash)
   if(isPinMatch){
    dbres.isVerified = isPinMatch
    dbres.save()
    .then(result=>{
      console.log(result);
      const {_id, name, email, username  } = dbres
      const KEY = process.env.JWT_PRIVATE
          const token = jwt.sign({ id:_id, isVerified: isPinMatch, name, email, username}, KEY)
          res.send(JSON.stringify({
              status:'ok',
              data: token
          }))
    })
   }
  })
}
module.exports = confirmVerificaiton