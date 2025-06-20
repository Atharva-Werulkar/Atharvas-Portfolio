import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const port = 3001;

app.use(cors({
  origin: ['http://localhost:8080', 'https://atharva-werulkar.vercel.app', 'https://profolio-new.vercel.app'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

// Types for blog response
interface BlogPost {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
}

interface BlogResponse {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: BlogPost[];
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'werulkaratharva@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'rfio rcse jpqm ypmv'
  }
});

// Helper functions
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

function extractThumbnail(content: string): string | null {
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = content.match(imgRegex);
  return match ? match[1] : null;
}

function calculateReadTime(content: string): number {
  const text = stripHtml(content);
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

//home route
app.get('/api/home', (req, res) => {
  res.json({ message: 'Welcome to the home page!' });
});

// Blog fetching endpoint
app.get('/api/blogs', async (req, res) => {
  try {
    const response = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@werulkaratharva"
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts from RSS');
    }
    
    const data: BlogResponse = await response.json();
    
    // Process and enhance the blog data
    const processedBlogs = data.items.map(blog => ({
      ...blog,
      excerpt: stripHtml(blog.description).substring(0, 150) + '...',
      thumbnail: extractThumbnail(blog.content),
      readTime: calculateReadTime(blog.content)
    }));
    
    res.json({
      success: true,
      data: {
        feed: data.feed,
        blogs: processedBlogs,
        count: processedBlogs.length
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
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
  console.log('Blog endpoint available at /api/blogs');
  console.log('Email endpoint available at /api/send-email');
});
