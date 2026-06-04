import sgMail from '@sendgrid/mail'

export const sendEmail = async (to, subject, text) => { 
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY not configured')
      throw new Error('Email service not configured')
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
      to,
      from: process.env.EMAIL_USER || 'noreply@serenityresort.com',
      subject,
      html: text
    }

    await sgMail.send(msg)
    console.log(`Email sent successfully to ${to}`)
  } catch (error) {
    console.error('Error sending email:', error.message)
    throw error
  }
}