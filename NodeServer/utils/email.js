import nodemailer from 'nodemailer';


// this email.js is used to send rest passwords code to the clients email address
const sendEmail = async ({ to, subject, html }) => {
    try {
        console.log('Trying to send email from ');
        console.log(process.env.EMAIL_USER);

        // CREATE TRANSPORTER 
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // true for 465, false for other ports like 587
            auth: { 
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false, // Add this if you encounter self-signed certificate issues
            }
        });

        // DEFINE EMAIL OPTIONS
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        };

        // sending the mail
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent');
    }
}

export default sendEmail;
