const sendMail = require("../../Utilities/sendMail")

const controlVerify = (req, res) => {
  const {email} = req.user
  sendMail()
  res.send('ok')
}
module.exports = controlVerify