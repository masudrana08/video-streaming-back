const jwt = require('jsonwebtoken')
require('dotenv').config()

const whoIs = (req,res, next)=>{
  const token = req.headers.token
  if(token){
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE)
      req.user = decoded
  }
  next()
}

module.exports = whoIs