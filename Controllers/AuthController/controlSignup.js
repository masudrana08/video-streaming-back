const UserModel = require("../../Models/UserModel")
const bcrypt = require('bcryptjs');

const controlSignup = (req, res)=>{
  const {name, username, email, password} = req.body
  const salt = bcrypt.genSaltSync(10)
  const passwordHash = bcrypt.hashSync(password, salt)
  const User = new UserModel({
      name, 
      username,
      email,
      passwordHash
  })
  User.save()
  .then(user=>{
      res.send(JSON.stringify({status:'ok'}))
  })
  .catch(err=>{
      res.send(JSON.stringify({status:'error'}))
  })
}

module.exports = controlSignup
