
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Hello! I am <span className="text-black">Evren Shah</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mt-2">
                Frontend <span className="bg-black text-white px-2 py-1 rounded">Developer</span>
              </h2>
              <p className="text-lg text-gray-600 mt-4">Based in India.</p>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
              I am a passionate frontend developer with expertise in modern web technologies. 
              I create responsive, user-friendly websites and applications that deliver exceptional 
              user experiences. Let's build something amazing together!
            </p>

            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <Github size={24} className="text-gray-700" />
              </a>
              <a href="#" className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <Linkedin size={24} className="text-gray-700" />
              </a>
              <a href="#" className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <Twitter size={24} className="text-gray-700" />
              </a>
              <a href="#" className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <Instagram size={24} className="text-gray-700" />
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="/lovable-uploads/62411c3b-f1f8-41ee-9b21-fb1ac899891a.png"
                alt="Developer illustration"
                className="w-80 h-80 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
