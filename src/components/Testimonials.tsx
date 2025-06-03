
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Evren Shah",
      company: "Facebook",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Flora Sheen",
      company: "Meta",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      featured: true
    },
    {
      name: "Evren Shah",
      company: "Facebook",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-16">
          My Testimonial
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 ${
                testimonial.featured 
                  ? 'bg-black text-white shadow-xl' 
                  : 'bg-white shadow-md hover:shadow-lg'
              }`}
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      testimonial.featured ? 'text-yellow-400' : 'text-yellow-500'
                    } fill-current`}
                  />
                ))}
              </div>
              
              <p className={`mb-6 leading-relaxed ${
                testimonial.featured ? 'text-gray-300' : 'text-gray-600'
              }`}>
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className={`font-semibold ${
                    testimonial.featured ? 'text-white' : 'text-gray-900'
                  }`}>
                    {testimonial.name}
                  </h4>
                  <p className={`text-sm ${
                    testimonial.featured ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
