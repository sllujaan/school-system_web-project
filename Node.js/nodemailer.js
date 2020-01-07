var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sllujaan44@gmail.com',
    pass: 'androidnew123'
  }
})

var mailOptions = {
  from: 'sllujaan44@gmail.com',
  to: 'bc170401495@vu.edu.pk',
  subject: 'Sending Email using Node.js',
  html: '<h1>Welcome</h1><p>That was easy!</p>'
}

transporter.sendMail(mailOptions, (err , info)=>{
  if (err) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})