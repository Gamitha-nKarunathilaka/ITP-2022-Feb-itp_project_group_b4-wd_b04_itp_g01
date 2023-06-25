const nodemailer = require("nodemailer");

const Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USEREMAIL,
    pass: process.env.EMAILPASS,
  },
});

module.exports = Transporter;
