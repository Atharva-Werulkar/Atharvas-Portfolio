import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'werulkaratharva@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'rfio rcse jpqm ypmv'
  }
});

app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'werulkaratharva@gmail.com',
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
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
