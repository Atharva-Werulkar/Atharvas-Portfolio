
const About = () => {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img
              src="/lovable-uploads/99ba1a6f-0cd8-4066-9842-244b34f496f9.png"
              alt="About me illustration"
              className="w-80 h-96 object-contain"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              About Me
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I'm a passionate frontend developer with over 5 years of experience creating 
                beautiful, functional, and user-centered digital experiences. I have a strong 
                background in modern web technologies and frameworks.
              </p>
              
              <p>
                My journey in web development started with curiosity about how websites work, 
                and it has evolved into a passion for creating seamless user experiences. 
                I enjoy working on challenging projects that push the boundaries of web technology.
              </p>
              
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open-source projects, or sharing my knowledge through blog posts and tutorials. 
                I believe in continuous learning and staying updated with the latest industry trends.
              </p>
              
              <p>
                I'm always excited to take on new challenges and collaborate with teams to create 
                innovative solutions. Let's work together to bring your ideas to life!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
