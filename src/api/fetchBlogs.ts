
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

interface RSSResponse {
  status: string;
  items: BlogPost[];
}

export const fetchBlogs = async (): Promise<BlogPost[]> => {
  try {
    // Try to fetch from server first, then fallback to direct RSS
    let response;
    let responseData;

    const apiUrl = import.meta.env.VITE_API_URL;
    
    try {
      response = await fetch(`${apiUrl}/blogs`);
      if (response.ok) {
        responseData = await response.json() as ServerResponse;
        if (responseData.success && responseData.data) {
          // Server already processes the data with excerpt and readTime
          return responseData.data.blogs;
        }
      }
    } catch {
      console.log('Server not available, falling back to direct RSS fetch');
    }
    
    // Fallback to direct RSS fetch if server is not available
    response = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@werulkaratharva"
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }
    
    responseData = await response.json() as RSSResponse;

    // Process the data to add excerpt and read time for direct RSS
    const processedBlogs = responseData.items.map((item: BlogPost) => {
      const excerpt = item.description.replace(/<[^>]+>/g, '').substring(0, 150) + '...';
      const readTime = Math.ceil(item.content.replace(/<[^>]+>/g, '').split(' ').length / 200); // Strip HTML and count words
      return { ...item, excerpt, readTime };
    });
    
    return processedBlogs;
  } catch (err) {
    console.error("Error fetching blogs:", err);
    throw new Error("Failed to fetch blogs. Please try again later.");
  }
};