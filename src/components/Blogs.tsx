import { useState, useEffect } from "react";
import { Calendar, ExternalLink, ArrowRight, BookOpen, Clock } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { fetchBlogs } from "@/api/fetchBlogs";

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

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const blogData = await fetchBlogs();
        setBlogs(blogData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blog posts");
        console.error("Error loading blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    const text = stripHtml(content);
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const getThumbnail = (content: string) => {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = content.match(imgRegex);
    return match ? match[1] : null;
  };

  const handleViewMoreBlogs = () => {
    window.open("https://medium.com/@werulkaratharva", "_blank");
  };

  if (loading) {
    return (
      <section className="py-16 px-4 bg-white flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-light text-gray-600">Loading Blog Posts...</h2>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-white flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-4xl font-bold mb-4 text-gray-900">My Blog Posts</h2>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={handleViewMoreBlogs}
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-all duration-300 font-medium"
          >
            Visit Medium Profile
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="blogs" className="py-16 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
             <div className="text-center mb-16 opacity-0 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-white-900 mb-4 font-heading">
            My Blog Posts
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Sharing insights, tutorials, and experiences from my development journey
          </p>
        </div>        {/* Featured Blog Carousel */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              dragFree: true,
            }}
            className="w-full"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Featured Articles</h3>
                <p className="text-gray-600">Latest insights from my development journey</p>
              </div>
              <div className="flex gap-2">
                <CarouselPrevious className="relative static translate-y-0 h-10 w-10 border-2 border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300" />
                <CarouselNext className="relative static translate-y-0 h-10 w-10 border-2 border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300" />
              </div>
            </div>
              <CarouselContent className="-ml-6">
              {blogs.map((blog, index) => (
                <CarouselItem key={blog.guid} className="pl-6 md:basis-1/2 lg:basis-1/3">
                  <article
                    className={`group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl h-full flex flex-col opacity-0 animate-fade-in-up`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Thumbnail */}
                    {getThumbnail(blog.content) && (
                      <div className="aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
                        <img
                          src={getThumbnail(blog.content) || "/placeholder.svg"}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    )}

                    <div className="p-6 flex-1 flex flex-col">
                      {/* Categories */}
                      {blog.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.categories.slice(0, 2).map((category, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 text-xs font-medium bg-black/5 text-gray-700 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all duration-300"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-black transition-colors leading-tight">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                        {blog.excerpt || getExcerpt(blog.description)}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1.5" />
                            <span>{formatDate(blog.pubDate)}</span>
                          </div>
                          {blog.readTime && (
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1.5" />
                              <span>{blog.readTime} min read</span>
                            </div>
                          )}
                        </div>
                        <a
                          href={blog.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-black hover:text-gray-700 transition-colors group/link font-medium"
                        >
                          <span className="mr-1">Read</span>
                          <ExternalLink 
                            size={14} 
                            className="group-hover/link:translate-x-1 transition-transform" 
                          />
                        </a>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

              {/* Call to Action */}
        <div className={`text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Want to read more?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Discover more tutorials, insights, and development stories on my Medium profile. 
              Join thousands of developers learning together!
            </p>
            <Button
              onClick={handleViewMoreBlogs}
              className="group bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 font-medium inline-flex items-center text-lg"
            >
              <BookOpen size={20} className="mr-2" />
              <span>Visit My Medium</span>
              <ArrowRight 
                size={20} 
                className="ml-2 group-hover:translate-x-1 transition-transform" 
              />
            </Button>
            <p className="text-gray-500 text-sm mt-4">
              {blogs.length} articles available • Updated regularly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
