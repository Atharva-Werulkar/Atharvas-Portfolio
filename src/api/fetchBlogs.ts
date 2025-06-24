
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
    console.log('Attempting to fetch blogs...');    try {
      // Try API server first if URL is available
      if (apiUrl) {
        try {
          console.log(`Trying to fetch from API server: ${apiUrl}/api/blogs`);
          response = await fetch(`${apiUrl}/api/blogs`);
          
          // Check if we got actual JSON response and not HTML
          const contentType = response.headers.get('content-type');
          if (response.ok && contentType && contentType.includes('application/json')) {
            const responseData = await response.json() as ServerResponse;
            if (responseData.success && responseData.data) {
              console.log(`Fetched ${responseData.data.blogs.length} blogs from server`);
              return responseData.data.blogs;
            }
          } else {
            console.log('Server returned non-JSON response:', contentType);
          }
        } catch (serverError) {
          console.log('Server error:', serverError);
        }
      } else {
        console.log('No API URL defined, skipping server fetch');
      }
      
      console.log('Server not available, trying CORS proxies');
    } catch (error) {
      console.log('Unexpected error in server fetch attempt:', error);
    }
      
    // Try multiple CORS proxies in case one fails
    const corsProxies = [
      "https://api.allorigins.win/raw?url=",
      "https://thingproxy.freeboard.io/fetch/", 
      "https://api.codetabs.com/v1/proxy?quest="
    ];
    
    // Try each proxy in sequence
    for (const proxy of corsProxies) {
      try {
        console.log(`Trying CORS proxy: ${proxy}`);
        response = await fetch(
          `${proxy}https://medium.com/feed/@werulkaratharva`, 
          {
            headers: {
              'Accept': 'application/xml, text/xml, */*'
            }
          }
        );
        
        if (response.ok) {
          console.log(`Successfully fetched using proxy: ${proxy}`);
          break;  // Exit the loop if successful
        }
      } catch (proxyError) {
        console.log(`Proxy ${proxy} failed:`, proxyError);
      }
    }
    
    // If no proxy succeeded, response will be undefined or not ok
    if (!response || !response.ok) {
      console.log('All CORS proxies failed, using fallback data');
      throw new Error('Failed to fetch from all available sources');
    }
    
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
    
    // Always return fallback data in production to ensure users see something
    console.log("Using fallback data");
    
    // More comprehensive sample data that mimics real blog posts
    return [
      {
        title: "Beginner's Guide to Integrating REST API and Mapping JSON in Flutter: A Bookify Case Study",
        pubDate: "Tue, 24 Jun 2025 08:26:09 GMT",
        link: "https://medium.com/@werulkaratharva/beginners-guide-to-integrating-rest-api-and-mapping-json-in-flutter-a-bookify-case-study-7a8acc20b9d3",
        guid: "https://medium.com/p/7a8acc20b9d3",
        author: "Werulkaratharva",
        thumbnail: "https://cdn-images-1.medium.com/max/1024/1*0OsKr2L8fMz3hLlgJHvtCg.png",
        description: "Integrating REST APIs and mapping JSON responses are essential skills for every Flutter developer.",
        content: "<figure><img alt=\"Cover Image\" src=\"https://cdn-images-1.medium.com/max/1024/1*0OsKr2L8fMz3hLlgJHvtCg.png\" /></figure><p>Integrating REST APIs and mapping JSON responses are essential skills for every Flutter developer. In this blog, I will explain how I integrated Google's Book API into my Flutter project, <a href=\"https://github.com/Atharva-Werulkar/bookify\"><strong>Bookify</strong></a>, step-by-step.</p>",
        categories: ["flutter", "api-integration", "mobile-app-development", "google-api", "rest-api"],
        excerpt: "Integrating REST APIs and mapping JSON responses are essential skills for every Flutter developer. In this blog, I will explain how I integrated Google's Book API into my Flutter project...",
        readTime: 7
      }, 
      {
        title: "Firebase Remote Config for App Update and Maintenance in Flutter: A Practical Guide",
        pubDate: "Fri, 20 Jun 2025 09:42:35 GMT",
        link: "https://medium.com/@werulkaratharva/firebase-remote-config-for-app-update-and-maintenance-in-flutter-a-practical-guide-4e354970f30e",
        guid: "https://medium.com/p/4e354970f30e",
        author: "Werulkaratharva",
        thumbnail: "https://cdn-images-1.medium.com/max/1024/1*DLVQuCyVLu3CONoy2s1ZRg.png",
        description: "Firebase Remote Config is a powerful tool for managing app updates and maintenance mode.",
        content: "<figure><img alt=\"\" src=\"https://cdn-images-1.medium.com/max/1024/1*DLVQuCyVLu3CONoy2s1ZRg.png\" /></figure><p>Firebase Remote Config is a powerful tool that allows developers to modify app behavior and appearance without requiring users to update the app.</p>",
        categories: ["remote-config", "flutter", "app-update", "mobile-app-development", "firebase"],
        excerpt: "Firebase Remote Config is a powerful tool that allows developers to modify app behavior and appearance without requiring users to update the app. In this blog, we will focus...",
        readTime: 6
      },
      {
        title: "Understanding Enums in Flutter: A Comprehensive Guide",
        pubDate: "Wed, 04 Jun 2025 11:06:55 GMT",
        link: "https://medium.com/@werulkaratharva/understanding-enums-in-flutter-a-comprehensive-guide-b1fa72cb8a12",
        guid: "https://medium.com/p/b1fa72cb8a12",
        author: "Werulkaratharva",
        thumbnail: "https://cdn-images-1.medium.com/max/406/1*jsCLFaGQWyTF-k_L_Q0NJQ.png",
        description: "A guide to using enums effectively in Flutter applications",
        content: "<p>Enums, short for enumerations, are a fundamental feature in Dart (and many programming languages) that allow you to define a fixed number of constant values.</p>",
        categories: ["development", "enum", "programming", "flutter"],
        excerpt: "Enums, short for enumerations, are a fundamental feature in Dart (and many programming languages) that allow you to define a fixed number of constant values...",
        readTime: 5
      }
    ];
  }
};