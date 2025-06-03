
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 opacity-0 animate-fade-in">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Hello! I am <span className="text-black">Atharva Werulkar</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mt-2">
                Flutter <span className="bg-black text-white px-2 py-1 rounded">Developer</span>
              </h2>
              <p className="text-lg text-gray-600 mt-4">Based in India.</p>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
              I am a passionate Flutter developer with expertise in cross-platform mobile development. 
              I create scalable, performant applications with dynamic UIs and real-time features. 
              Let's build something amazing together!
            </p>

            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 hover:scale-105">
                <Github size={24} className="text-gray-700" />
              </a>
              <a href="#" className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 hover:scale-105">
                <Linkedin size={24} className="text-gray-700" />
              </a>
              <a href="#" className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 hover:scale-105">
                <Twitter size={24} className="text-gray-700" />
              </a>
              <a href="#" className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 hover:scale-105">
                <Instagram size={24} className="text-gray-700" />
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="relative">
              <img
                src="/lovable-uploads/62411c3b-f1f8-41ee-9b21-fb1ac899891a.png"
                alt="Developer illustration"
                className="w-80 h-80 object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
