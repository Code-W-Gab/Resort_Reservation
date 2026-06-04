import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, text) => { 
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('EMAIL_USER or EMAIL_PASS not configured')
      throw new Error('Email configuration missing')
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
    
      port: 587,
    
      secure: false,

      tls: {
        rejectUnauthorized: false,
      },
    
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to, 
      subject,
      html: text
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  } 
}