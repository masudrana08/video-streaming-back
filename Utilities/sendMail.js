const nodemailer = require('nodemailer');
require('dotenv').config()


function sendMail(props) {
return new Promise((resolve, reject)=>{
  const transport = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
   })
   const options = {
    from : process.env.MAIL_USER,
    to: props.to,
    subject: props.subject,
   }
   if(props.text){
    options.text = props.text
   }
   if(props.html){
    options.html = props.html
   }
  
   transport.sendMail(options, (err, info)=>{
    if(!err){
      resolve('mail send')
    }else{
      reject('Something Wrong')
    }
   })
})
}



module.exports = sendMail