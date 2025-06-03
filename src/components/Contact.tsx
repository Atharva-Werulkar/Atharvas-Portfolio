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
                <span className="text-gray-700">werulkaratharva@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-gray-400" size={20} />
                <span className="text-gray-700">+918080395818</span>
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
