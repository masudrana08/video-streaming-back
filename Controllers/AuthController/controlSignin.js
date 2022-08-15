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
    const {name, email,username, isVerified} = user
      const isAuthenticated = bcrypt.compareSync(password, user.passwordHash)
      if(isAuthenticated){
          const KEY = process.env.JWT_PRIVATE
          const token = jwt.sign({ id:user._id, isVerified, name, email, username}, KEY)
          res.send(JSON.stringify({
              status:'ok',
              data: token
          }))
      }else{
          res.status(401).json({
            message:'Auth Failed'
        })
      }
  })
  .catch(err=>{
    res.status(401).json({
        message: err.message
    })
  })
}

module.exports = controlSignin