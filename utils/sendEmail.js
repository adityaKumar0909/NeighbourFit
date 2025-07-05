const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})

async function sendEmail(to, subject, text,otp) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to:to,
        subject: subject,
        text: text + otp
    }

    try{
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }catch(err){
        console.error('Error sending email:', err);
    }
}

module.exports = sendEmail;


//TODO - Use mailgun instead of gmail (to avoid mails landing in spam )
