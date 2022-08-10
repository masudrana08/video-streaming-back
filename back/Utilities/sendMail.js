const nodemailer = require('nodemailer');
require('dotenv').config()


function sendMail() {

 const transport = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
 })
 const options = {
  from : process.env.MAIL_USER,
  to: 'masud@bursement.com',
  subject: 'NOTHING',
  text: 'OOP '
  
 }

 transport.sendMail(options, (err, info)=>{
  console.log(err);
 })

}



module.exports = sendMail