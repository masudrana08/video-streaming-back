const fs = require('fs')
const path = require('path')
const errorPath = path.join(process.cwd(), 'storage', 'error.txt')

function logError(err, req, res, next){
  if(err){
    const text = `👉 ${new Date().toLocaleDateString()}T${new Date().toLocaleTimeString()} => m:${err.message} \n s:${err.stack} \n`
    fs.appendFile(errorPath, text, cb=>{
      res.status(400).json(err.message)
    })
  }else{
    next()
  }
  
}

module.exports = logError