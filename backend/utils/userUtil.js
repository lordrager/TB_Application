var nodemailer = require('nodemailer');
const Verification = require('../models/verificationModel');
const User = require('../models/userModel');


// This send an email to the user with a verification code
exports.emailVerification = async (email) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lorenzoeccheli003@gmail.com',
      pass: 'psw'
    }
  });
  const code = Math.random() * (9999999 - 1000000) + 1000000;
  var user;
  User.findByEmail(email).then(user => {
    user = user;
  })
  .catch(err => {console.log(err)});
  var mailOptions = {
    from: 'lorenzoeccheli003@gmail.com',
    to: email,
    subject: 'Email verification',
    text: 'The secret number is ' + code
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      const verification = new Verification(null, email, user, code);
      console.log('Email sent: ' + info.response);    
    }
  });
};
