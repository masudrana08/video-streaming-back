const UserModel = require("../../Models/UserModel")
const sendMail = require("../../Utilities/sendMail")
const bcrypt = require('bcryptjs')

const controlSendVerificationPin = (req, res) => {
  const randArr = []
  for(let i=0; i<6; i++){
    randArr.push(Math.floor(Math.random()*10))
  }
  const verificationNumber = randArr.join('')
  const {email, isVerified} = req.user
  sendMail({
    to: email,
    subject:'Check Your Verification Code',
    text : 'Your verification code is: '+verificationNumber,
  })
  .then(result=>{
    UserModel.findOne({username: req.user.username})
    .then(dbres=>{
      const salt = bcrypt.genSaltSync(10)
      const pinHash = bcrypt.hashSync(verificationNumber, salt)
      dbres.tempPinHash = pinHash
      dbres.save()
      setTimeout(()=>{
        dbres.tempPinHash = ''
        dbres.save()
      }, 1000*300)
    })
    res.send(JSON.stringify({status:'ok', data: 'Don\'t forget to check Spam folder.'}))
  })
  .catch(err=>{
    res.status(500).send(JSON.stringify({status:'error', data: 'Something Wrong'}))
  })
  
}
module.exports = controlSendVerificationPin