
const About = () => {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center opacity-0 animate-fade-in">
            <img
              src="/assets/99ba1a6f-0cd8-4066-9842-244b34f496f9.png"
              alt="About me illustration"
              className="w-80 h-96 object-contain"
            />
          </div>
          
          <div className="space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              About Me
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I'm Atharva Werulkar, a passionate and solution-driven Flutter Developer with a strong 
                foundation in both frontend and backend development. Over the years, I've developed, 
                deployed, and optimized multiple cross-platform mobile apps, many of which are live on the Play Store.
              </p>
              
              <p>
                I specialize in crafting scalable and performant applications with dynamic UIs, custom logic, 
                real-time features, and seamless API integrations. Beyond Flutter, I've explored and implemented 
                technologies across the full stack—from building Node.js APIs and integrating Supabase databases, 
                to working with Salesforce Apex for custom automation.
              </p>
              
              <p>
                I also have experience working with generative AI models like SRGANs for image super-resolution, 
                and building tools like UpSync, a scalable app version control platform with a dedicated mobile and web portal.
              </p>
              
              <p>
                With hands-on experience in Firebase, real-time data sync, and JSON-based dynamic UI rendering, 
                I enjoy building robust solutions that are user-centric and developer-friendly. I'm also a strong 
                believer in clean architecture, team collaboration, and continuous learning.
              </p>
              
              <p>
                Currently, I'm actively contributing to production-grade apps and SaaS platforms, and I'm always 
                eager to learn new technologies and push the boundaries of what's possible in mobile and cloud computing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
