
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

interface ServerResponse {
  success: boolean;
  data: {
    feed: any;
    blogs: BlogPost[];
    count: number;
  };
}

// Function to parse XML string to DOM Document
const parseXML = (xmlString: string): Document => {
  const parser = new DOMParser();
  return parser.parseFromString(xmlString, 'application/xml');
};

// Function to safely extract text content from XML node
const getNodeText = (node: Element | null): string => {
  if (!node) return '';
  
  // Handle CDATA sections
  const cdataSection = node.getElementsByTagName('![CDATA[')[0];
  if (cdataSection) {
    return cdataSection.textContent || '';
  }
  
  return node.textContent || '';
};

// Function to extract thumbnail from content
const extractThumbnail = (content: string): string => {
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = content.match(imgRegex);
  return match ? match[1] : '';
};

// Function to calculate read time
const calculateReadTime = (content: string): number => {
  // Remove HTML tags and count words
  const text = content.replace(/<[^>]+>/g, '');
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  // Average reading speed: 200 words per minute
  return Math.ceil(wordCount / 200);
};

export const fetchBlogs = async (): Promise<BlogPost[]> => {  try {
    // Try to fetch from server first, then fallback to CORS proxy for RSS
    let response;
    let blogs: BlogPost[] = [];

    const apiUrl = import.meta.env.VITE_API_URL || '';
    console.log('Attempting to fetch blogs...');
      try {
      // Try API server first
      response = await fetch(`${apiUrl}/api/blogs`);
      if (response.ok) {
        const responseData = await response.json() as ServerResponse;
        if (responseData.success && responseData.data) {
          // Server processes the data with excerpt and readTime
          console.log(`Fetched ${responseData.data.blogs.length} blogs from server`);
          return responseData.data.blogs;
        }
      }
    } catch (error) {
      console.log('Server error:', error);
      console.log('Server not available, falling back to CORS proxy');
    }
      // Use a CORS proxy to fetch Medium RSS feed    // Use a CORS proxy to fetch Medium RSS feed
    const corsProxy = "https://corsproxy.io/?";
    response = await fetch(
      `${corsProxy}https://medium.com/feed/@werulkaratharva`, 
      {
        headers: {
          'Accept': 'application/xml, text/xml, */*'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }    const xmlText = await response.text();
      
    // Parse XML response
    const xmlDoc = parseXML(xmlText);
    const items = xmlDoc.querySelectorAll('item');
      
    // If no items were found, throw an error
    if (!items || items.length === 0) {
      throw new Error('No blog posts found in the XML response');
    }
    
    blogs = Array.from(items).map(item => {
      // Extract content
      const contentNode = item.querySelector('content\\:encoded') || item.querySelector('encoded');
      const content = getNodeText(contentNode as Element);
      
      // Extract categories
      const categoryNodes = item.querySelectorAll('category');
      const categories = Array.from(categoryNodes).map(cat => getNodeText(cat as Element));
      
      // Extract title, removing CDATA wrapper if present
      let title = getNodeText(item.querySelector('title') as Element);
      title = title.replace(/^\s*<!\[CDATA\[(.*)\]\]>\s*$/, '$1').trim();
      
      // Extract author
      let author = getNodeText(item.querySelector('dc\\:creator') as Element);
      author = author.replace(/^\s*<!\[CDATA\[(.*)\]\]>\s*$/, '$1').trim();
      
      // Extract description
      const description = getNodeText(item.querySelector('description') as Element)
        .replace(/^\s*<!\[CDATA\[(.*)\]\]>\s*$/, '$1').trim();
      
      // Extract thumbnail from content
      const thumbnail = extractThumbnail(content);
      
      // Calculate excerpt
      const excerpt = content.replace(/<[^>]+>/g, '').substring(0, 150) + '...';
      
      // Calculate read time
      const readTime = calculateReadTime(content);
      
      return {
        title,
        pubDate: getNodeText(item.querySelector('pubDate') as Element),
        link: getNodeText(item.querySelector('link') as Element),
        guid: getNodeText(item.querySelector('guid') as Element),
        author,
        content,
        description,
        thumbnail,
        categories,
        excerpt,
        readTime
      };
    });
    
    return blogs;  } catch (err) {
    console.error("Error fetching blogs:", err);
    
    // In production, you might want to return sample data instead of throwing
    // This ensures users always see something even when API fails
    const useFallbackData = true;
    
    if (useFallbackData) {
      console.log("Using fallback data");
      return [{
        title: "Beginner's Guide to Flutter API Integration",
        pubDate: "Tue, 24 Jun 2025 08:26:09 GMT",
        link: "https://medium.com/@werulkaratharva",
        guid: "sample-1",
        author: "Werulkaratharva",
        thumbnail: "https://cdn-images-1.medium.com/max/1024/1*0OsKr2L8fMz3hLlgJHvtCg.png",
        description: "Integrating REST APIs in Flutter applications",
        content: "<p>Sample content</p>",
        categories: ["flutter", "api-integration"],
        excerpt: "Integrating REST APIs and mapping JSON responses are essential skills for every Flutter developer...",
        readTime: 5
      }, 
      {
        title: "Firebase Remote Config for App Updates",
        pubDate: "Fri, 20 Jun 2025 09:42:35 GMT",
        link: "https://medium.com/@werulkaratharva",
        guid: "sample-2",
        author: "Werulkaratharva",
        thumbnail: "https://cdn-images-1.medium.com/max/1024/1*DLVQuCyVLu3CONoy2s1ZRg.png",
        description: "Using Firebase for app updates",
        content: "<p>Sample content</p>",
        categories: ["firebase", "flutter"],
        excerpt: "Firebase Remote Config is a powerful tool that allows developers to modify app behavior...",
        readTime: 4
      }];
    }
    
    // If fallback data is disabled, throw the error
    if (err instanceof Error) {
      throw new Error(`Failed to fetch blogs: ${err.message}`);
    } else {
      throw new Error("Failed to fetch blogs. Please try again later.");
    }
  }
};