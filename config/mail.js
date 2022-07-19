const nodemailer = require("nodemailer");
const smtpTransport = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "Gmail",
    auth: {
        user: process.env.EMAIL_USER || "cram.testing@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "canela2606",
    }
  });

module.exports = smtpTransport