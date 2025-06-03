
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Let's <span className="underline">talk</span> for<br />
              Something special
            </h2>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              I seek to push the limits of creativity to create high-engaging, 
              user-friendly, and memorable interactive experiences.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Mail className="text-gray-400" size={20} />
                <span className="text-gray-700">youremail@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-gray-400" size={20} />
                <span className="text-gray-700">+1234567890</span>
              </div>
            </div>
            
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
          
          <div className="bg-gray-50 p-8 rounded-xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
              
              <input
                type="text"
                placeholder="Your subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200"
              />
              
              <textarea
                placeholder="Your message"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 resize-none"
              ></textarea>
              
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
