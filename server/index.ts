import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const port = 3001;

// Expanded CORS configuration for better compatibility
app.use(cors({
  origin: [
    'http://localhost:8080', 
    'http://localhost:5173',
    'https://atharva-werulkar.vercel.app', 
    'https://profolio-new.vercel.app',
    'https://react-site-design.vercel.app'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  maxAge: 86400 // CORS preflight cache time (24 hours)
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
    console.log('Received request for /api/blogs');
    
    // Fetch directly from Medium's RSS feed
    const response = await fetch(
      "https://medium.com/feed/@werulkaratharva", 
      {
        headers: {
          'Accept': 'application/xml, text/xml, */*',
          'User-Agent': 'Mozilla/5.0 Portfolio Website (Node.js Server)'
        },
        // Set a reasonable timeout
        signal: AbortSignal.timeout(10000) // 10 seconds timeout
      }
    );
    
    if (!response.ok) {
      console.error(`Medium API response not OK: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch blog posts from RSS: ${response.status} ${response.statusText}`);
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
    });  } catch (error) {
    console.error('Error fetching blogs:', error);
    
    // Return fallback data if available, better than nothing
    const provideFallbackData = true;
    
    if (provideFallbackData) {
      console.log('Providing fallback data due to error');
      
      // Simple fallback data when the API fails
      const fallbackBlogs = [
        {
          title: "Beginner's Guide to Integrating REST API in Flutter",
          pubDate: "Tue, 24 Jun 2025 08:26:09 GMT",
          link: "https://medium.com/@werulkaratharva",
          guid: "server-fallback-1",
          author: "Werulkaratharva",
          thumbnail: "https://cdn-images-1.medium.com/max/1024/1*0OsKr2L8fMz3hLlgJHvtCg.png",
          description: "API integration guide for Flutter",
          content: "<p>Sample fallback content from server</p>",
          categories: ["flutter", "api"],
          excerpt: "This is fallback data from the server when Medium API fails",
          readTime: 5
        },
        {
          title: "Firebase Remote Config for App Updates",
          pubDate: "Fri, 20 Jun 2025 09:42:35 GMT",
          link: "https://medium.com/@werulkaratharva",
          guid: "server-fallback-2",
          author: "Werulkaratharva",
          thumbnail: "https://cdn-images-1.medium.com/max/1024/1*DLVQuCyVLu3CONoy2s1ZRg.png",
          description: "Using Firebase for app updates",
          content: "<p>Sample fallback content from server</p>",
          categories: ["firebase", "flutter"],
          excerpt: "This is fallback data from the server when Medium API fails",
          readTime: 4
        }
      ];
      
      return res.json({
        success: true,
        data: {
          feed: {
            url: "https://medium.com/feed/@werulkaratharva",
            title: "Atharva Werulkar's Blog (Fallback)",
            link: "https://medium.com/@werulkaratharva",
            author: "Atharva Werulkar",
            description: "Fallback data when API is unavailable",
            image: ""
          },
          blogs: fallbackBlogs,
          count: fallbackBlogs.length,
          isFallback: true
        }
      });
    }
    
    // Only reach here if fallback data is disabled
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
