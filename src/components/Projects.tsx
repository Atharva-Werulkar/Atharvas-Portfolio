
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Crypto Screener Application",
      description: "I'm a developer focused on creating responsive, cross-platform applications for cryptocurrency monitoring and analysis.",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=400&fit=crop",
      number: "01"
    },
    {
      title: "Euphoria - Ecommerce (Apparel) Website Template",
      description: "Providing comprehensive services from concept to implementation and testing for modern ecommerce platforms.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      number: "02"
    },
    {
      title: "Blog Website Template",
      description: "I have built a responsive blog template with modern design principles and optimal user experience.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
      number: "03"
    }
  ];

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
          My Projects
        </h2>
        
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 sm:h-80 object-cover rounded-xl"
                />
              </div>
              
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="text-6xl sm:text-7xl font-bold text-gray-800">
                  {project.number}
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200">
                    <ExternalLink size={20} />
                    <span>Live Demo</span>
                  </button>
                  <button className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200">
                    <Github size={20} />
                    <span>View Code</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
