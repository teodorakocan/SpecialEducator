const e = require('express');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
       user: 'specialeducator2021@gmail.com',
       pass: 'Defektolog2021Fido'
   } 
});

module.exports = transporter;