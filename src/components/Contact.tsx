import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { useState, FormEvent } from "react";
import { sendEmail } from "../api/sendMail";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({
    type: null,
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await sendEmail(formData);
      setStatus({
        type: result.success ? 'success' : 'error',
        message: result.message
      });
      if (result.success) {
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-20">
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
                <span className="text-gray-700">werulkaratharva@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-gray-400" size={20} />
                <span className="text-gray-700">+918080395818</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
               <a href="https://github.com/Atharva-Werulkar" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" width={24} height={24} className="text-gray-700" aria-label="GitHub">
                  <title>GitHub</title>
                  <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.583 0-.288-.012-1.243-.017-2.252-3.338.726-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.382 1.236-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/atharva-werulkar/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 hover:scale-105">
                <svg role="img" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" className="text-gray-700" xmlns="http://www.w3.org/2000/svg" aria-label="LinkedIn">
                  <title>LinkedIn</title>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.9 1.637-1.849 3.37-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.222 0z"/>
                </svg>
              </a>
              <a href="https://x.com/AtharvaWerulkar" className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 hover:scale-105">
                <Twitter size={24} className="text-gray-700" />
              </a>
              <a href="https://www.instagram.com/__athrv.__/" className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 hover:scale-105">
                <Instagram size={24} className="text-gray-700" />
              </a>
          
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
              
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Your subject"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200"
              />
              
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 resize-none"
              ></textarea>
              
              {status.message && (
                <div className={`p-3 rounded-lg ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {status.message}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
