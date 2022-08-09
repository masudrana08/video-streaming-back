const UserModel = require("../../Models/UserModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const controlSignin = (req, res)=>{
  const {email, username, password} = req.body
  const myQuery = {}
  if(email) {
      myQuery.email = email
  } else if(username){
      myQuery.username = username
  }
  UserModel.findOne(myQuery)
  .then(user=>{
      const isAuthenticated = bcrypt.compareSync(password, user.passwordHash)
      if(isAuthenticated){
          const KEY = process.env.JWT_PRIVATE
          const token = jwt.sign({name:user.name, email:user.email}, KEY)
          res.send(JSON.stringify({
              status:'ok',
              data: token
          }))
      }else{
          res.send(JSON.stringify({
              status:'Auth Failed'
          }))
      }
  })
  .catch(err=>{
      res.send(JSON.stringify({status:'error'}))
  })
}

module.exports = controlSignin