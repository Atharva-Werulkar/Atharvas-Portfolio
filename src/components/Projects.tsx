import { ExternalLink, Github, Star, GitFork, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

const Projects = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Atharva-Werulkar/repos?sort=pushed&direction=desc&per_page=10');
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError('Failed to load repositories');
        console.error('Error fetching repos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
    
    // Trigger animation after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % repos.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + repos.length) % repos.length);
  };

  const goToProject = (index: number) => {
    setCurrentIndex(index);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-light">Loading Projects...</h2>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-red-400">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}>
           <h2 className="text-4xl sm:text-5xl font-bold text-white-900 mb-4 opacity-0 animate-fade-in font-heading">
            My Projects 
          </h2>
        </div>

        {/* Main Project Display */}
        <div className="max-w-6xl mx-auto font-sans">
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {repos.length > 0 && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Project Card */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:border-white/20">
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-3xl font-light mb-2 text-white font-heading">
                          {repos[currentIndex].name
                            .split(/[-_]/)
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')
                          }
                        </h3>
                        <div className="flex items-center space-x-4 text-gray-400 text-sm">
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{formatDate(repos[currentIndex].updated_at)}</span>
                          </div>
                          {repos[currentIndex].language && (
                            <span className="px-2 py-1 bg-white/10 rounded text-xs">
                              {repos[currentIndex].language}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <Star size={16} />
                          <span className="text-sm">{repos[currentIndex].stargazers_count}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-400">
                          <GitFork size={14} />
                          <span className="text-sm">{repos[currentIndex].forks_count}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                      {repos[currentIndex].description || "A carefully crafted project showcasing modern development practices."}
                    </p>

                    {/* Topics */}
                    {repos[currentIndex].topics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {repos[currentIndex].topics.slice(0, 4).map((topic) => (
                          <span key={topic} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-6">
                      <a 
                        href={repos[currentIndex].html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-white hover:text-gray-300 transition-all duration-300 group"
                      >
                        <Github size={18} className="group-hover:scale-110 transition-transform" />
                        <span>View Code</span>
                      </a>
                      <a 
                        href={repos[currentIndex].html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-white hover:text-gray-300 transition-all duration-300 group"
                      >
                        <ExternalLink size={18} className="group-hover:scale-110 transition-transform" />
                        <span>Live Demo</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Navigation & Preview */}
                <div className="space-y-8">
                  {/* Navigation Controls */}
                  <div className="flex items-center justify-center space-x-4">
                    <button 
                      onClick={prevProject}
                      className="p-3 border border-white/20 rounded-full hover:bg-white/5 transition-all duration-300 hover:scale-110"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    <div className="flex space-x-2">
                      {repos.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToProject(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                              ? 'bg-white scale-125' 
                              : 'bg-white/30 hover:bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <button 
                      onClick={nextProject}
                      className="p-3 border border-white/20 rounded-full hover:bg-white/5 transition-all duration-300 hover:scale-110"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  {/* Project Preview Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {repos.slice(0, 4).map((repo, index) => (
                      <button
                        key={repo.id}
                        onClick={() => goToProject(index)}
                        className={`text-left p-4 rounded-lg border transition-all duration-300 ${
                          index === currentIndex
                            ? 'border-white bg-white/5 scale-105'
                            : 'border-gray-800 hover:border-gray-600 hover:bg-white/5'
                        }`}
                      >
                        <h4 className="font-medium text-sm mb-1 truncate">
                          {repo.name.split(/[-_]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </h4>
                        <p className="text-xs text-gray-400 line-clamp-2">
                          {repo.description?.slice(0, 60) || "No description"}...
                        </p>
                        <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                          <Star size={12} />
                          <span>{repo.stargazers_count}</span>
                          {repo.language && (
                            <span className="px-1 py-0.5 bg-gray-800 rounded text-xs">
                              {repo.language}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-gray-400 text-sm">
            {currentIndex + 1} of {repos.length} projects
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;