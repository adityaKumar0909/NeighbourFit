const axios = require('axios');
require('dotenv').config();

async function sendEmail(to, subject, text, otp) {
    const serviceID = process.env.EMAILJS_SERVICE_ID;
    const templateID = process.env.EMAILJS_TEMPLATE_ID;
    const userID = process.env.EMAILJS_PUBLIC_KEY;

    const templateParams = {
        email: to,
        passcode:otp,
    };

    try {
        const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
            service_id: serviceID,
            template_id: templateID,
            user_id: userID,
            template_params: templateParams,
        });

        console.log('✅ Email sent successfully', response.data);
    } catch (err) {
        console.error('❌ Error sending email:', err.response?.data || err.message);
    }
}

module.exports = sendEmail;
