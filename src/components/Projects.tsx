
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
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

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Atharva-Werulkar/repos?sort=updated&per_page=6');
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
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
            My Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-gray-700 rounded mb-4"></div>
                <div className="h-20 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">My Projects</h2>
          <p className="text-red-400">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 opacity-0 animate-fade-in">
          My Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo, index) => (
            <div 
              key={repo.id} 
              className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-all duration-300 hover:scale-105 opacity-0 animate-fade-in border border-gray-800"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-white truncate">
                  {repo.name}
                </h3>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star size={16} />
                  <span className="text-sm">{repo.stargazers_count}</span>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 h-12 overflow-hidden">
                {repo.description || "No description available"}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                {repo.language && (
                  <span className="bg-blue-600 text-xs px-2 py-1 rounded">
                    {repo.language}
                  </span>
                )}
                <div className="flex items-center space-x-1 text-gray-400">
                  <GitFork size={14} />
                  <span className="text-xs">{repo.forks_count}</span>
                </div>
              </div>
              
              {repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="bg-gray-700 text-xs px-2 py-1 rounded">
                      {topic}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex space-x-4">
                <a 
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <Github size={16} />
                  <span className="text-sm">View Code</span>
                </a>
                <a 
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <ExternalLink size={16} />
                  <span className="text-sm">Details</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
