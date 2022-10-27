require("dotenv").config;
const nodemailer = require("nodemailer");

module.exports = function (email, subject, message) {
  let mailTransporter = nodemailer.createTransport({
    host: process.env.gmail_host, // hostname
    service: "gmail",
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.gmail_user_auth,
      pass: process.env.gmail_user_pass,
    },
  });

  let mailDetails = {
    from: "eshopmern@gmail.com",
    to: email,
    subject: subject,
    text: message,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log(err);
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
    }
  });
};
