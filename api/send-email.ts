import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = request.body;

  if (!name || !email || !subject || !message) {
    return response.status(400).json({ 
      success: false,
      message: 'Missing required fields' 
    });
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Contact Form: ${subject}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    response.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    response.status(500).json({ 
      success: false, 
      message: 'Failed to send email. Please try again.' 
    });
  }
}
