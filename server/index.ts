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
  excerpt?: string;
  readTime?: number;
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

function extractThumbnail(content: string): string {
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = content.match(imgRegex);
  return match ? match[1] : '';
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
    // Fetch directly from Medium's RSS feed
    const response = await fetch(
      "https://medium.com/feed/@werulkaratharva", 
      {
        headers: {
          'Accept': 'application/xml, text/xml, */*'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts from RSS');
    }
    
    const xmlText = await response.text();
    
    // Parse the XML using DOMParser
    const { DOMParser } = await import('xmldom');
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
    // Get channel information (feed metadata)
    const channel = xmlDoc.getElementsByTagName('channel')[0];
    const feedTitle = channel.getElementsByTagName('title')[0]?.textContent || '';
    const feedLink = channel.getElementsByTagName('link')[0]?.textContent || '';
    const feedDesc = channel.getElementsByTagName('description')[0]?.textContent || '';
    
    // Helper function for getting text from node
    const getElementText = (element: Element, tagName: string): string => {
      if (!element) return '';
      const nodes = element.getElementsByTagName(tagName);
      if (nodes.length === 0) return '';
      return nodes[0].textContent?.trim() || '';
    };
    
    // Process all items/posts
    const items = xmlDoc.getElementsByTagName('item');
    const blogs: BlogPost[] = [];
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      // Get title
      let title = getElementText(item, 'title');
      title = title.replace(/^\s*<!\[CDATA\[(.*)\]\]>\s*$/, '$1').trim();
      
      // Get link
      const link = getElementText(item, 'link');
      
      // Get pubDate
      const pubDate = getElementText(item, 'pubDate');
      
      // Get guid
      const guid = getElementText(item, 'guid');
      
      // Get author - handle namespaced tags
      let author = '';
      const creatorTags = item.getElementsByTagName('dc:creator');
      if (creatorTags.length > 0) {
        author = creatorTags[0].textContent?.trim() || '';
      } else {
        author = 'Atharva Werulkar';
      }
      author = author.replace(/^\s*<!\[CDATA\[(.*)\]\]>\s*$/, '$1').trim();
      
      // Get description
      let description = getElementText(item, 'description');
      description = description.replace(/^\s*<!\[CDATA\[(.*)\]\]>\s*$/, '$1').trim();
      
      // Get content - handle namespaced tags
      let content = '';
      const contentTags = item.getElementsByTagName('content:encoded');
      if (contentTags.length > 0) {
        content = contentTags[0].textContent?.trim() || '';
      }
      content = content.replace(/^\s*<!\[CDATA\[(.*)\]\]>\s*$/, '$1').trim();
      
      // Get categories
      const categories: string[] = [];
      const categoryNodes = item.getElementsByTagName('category');
      for (let j = 0; j < categoryNodes.length; j++) {
        const cat = categoryNodes[j].textContent?.trim();
        if (cat) categories.push(cat);
      }
      
      // Extract thumbnail
      const thumbnail = extractThumbnail(content);
      
      // Calculate excerpt
      const excerpt = stripHtml(content).substring(0, 150) + '...';
      
      // Calculate read time
      const readTime = calculateReadTime(content);
      
      // Create blog post object
      blogs.push({
        title,
        pubDate,
        link,
        guid,
        author,
        thumbnail,
        description,
        content,
        categories,
        excerpt,
        readTime
      });
    }
    
    res.json({
      success: true,
      data: {
        feed: {
          url: "https://medium.com/feed/@werulkaratharva",
          title: feedTitle,
          link: feedLink,
          author: "Atharva Werulkar",
          description: feedDesc,
          image: ""
        },
        blogs,
        count: blogs.length
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
