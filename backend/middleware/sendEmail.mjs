import sgMail from '@sendgrid/mail'

export const sendEmail = async (to, subject, html) => { 
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY not configured')
      throw new Error('Email service not configured')
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    // Use a verified sender email or SendGrid default
    const fromEmail = process.env.EMAIL_USER || 'sendgrid@example.com'

    const msg = {
      to,
      from: {
        email: process.env.EMAIL_USER || 'noreply@serenityresort.com',
        name: 'Serenity Resort' 
      },
      subject,
      html,
      replyTo: process.env.EMAIL_USER  
    }

    await sgMail.send(msg)
    console.log(`Email sent successfully to ${to}`)
  } catch (error) {
    console.error('Error sending email:', error.message)
    throw error
  }
}