import { useState, useEffect } from "react";
import { Code, Database, Cloud, Smartphone, Brain, Settings, ChevronRight } from "lucide-react";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

 const skillCategories = [
  {
    title: "Mobile & Cross-Platform",
    icon: <Smartphone size={24} />,
    skills: ["Flutter", "Dart", "Shorebird", "Codemagic", "Bloc Pattern", "JSON-based Dynamic UI"],
    color: "from-white to-gray-100",
    border: "border-gray-300"
  },
  {
    title: "Backend & APIs",
    icon: <Code size={24} />,
    skills: ["Node.js", "Supabase", "Firebase", "REST APIs", "WebSocket"],
    color: "from-white to-gray-100",
    border: "border-gray-300"
  },
  {
    title: "Database & Storage",
    icon: <Database size={24} />,
    skills: ["PostgreSQL", "Firebase Firestore", "Local Storage", "Hive"],
    color: "from-white to-gray-100",
    border: "border-gray-300"
  },
  {
    title: "Cloud & Tools",
    icon: <Cloud size={24} />,
    skills: ["Google Cloud Console", "OneSignal", "OTPless", "Firebase Console", "Git", "GitHub Actions"],
    color: "from-white to-gray-100",
    border: "border-gray-300"
  },
  {
    title: "AI/ML & Other",
    icon: <Brain size={24} />,
    skills: ["SRGAN", "ESRGAN", "SRCNN", "Salesforce Apex", "Figma"],
    color: "from-white to-gray-100",
    border: "border-gray-300"
  },
  {
    title: "Dev Practices",
    icon: <Settings size={24} />,
    skills: ["Clean Architecture", "Feature-first Development", "Offline Sync", "Real-time Updates"],
    color: "from-white to-gray-100",
    border: "border-gray-300"
  }
];


  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    // Auto-rotate through categories
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % skillCategories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="skills" className="min-h-screen bg-white text-black relative overflow-hidden scroll-mt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(0,0,0,0.07) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(0,0,0,0.07) 0%, transparent 50%)
          `
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
         {/* Header */}
         <div className={`text-center mb-16 pt-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-white-900 mb-4 opacity-0 animate-fade-in font-heading">
          My Skills 
          </h2>
          <p className="text-xl text-gray-600 font-light">
            Technologies and tools I master
          </p>
        </div>

       

        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className={`grid grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              {skillCategories.map((category, index) => (
                <div 
                  key={category.title}
                  className={`group relative transition-all duration-500 ${
                    index === activeCategory ? 'scale-105' : 'hover:scale-102'
                  }`}
                  onMouseEnter={() => setActiveCategory(index)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`
                    bg-gradient-to-br ${category.color} backdrop-blur-sm
                    border ${index === activeCategory ? category.border : 'border-gray-200'}
                    rounded-2xl p-8 h-full transition-all duration-500
                    ${index === activeCategory ? 'shadow-2xl shadow-black/10' : 'hover:border-gray-300'}
                  `}>
                    {/* Category Header */}
                    <div className="flex items-center mb-6">
                      <div className={`p-3 rounded-xl bg-black/10 mr-4 transition-all duration-300 ${
                        index === activeCategory ? 'bg-black/20 scale-110' : 'group-hover:bg-black/15'
                      }`}>
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-light text-black">
                        {category.title}
                      </h3>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <div 
                          key={skill}
                          className={`flex items-center transition-all duration-300 ${
                            index === activeCategory 
                              ? 'translate-x-2 opacity-100' 
                              : 'opacity-70 hover:opacity-100 hover:translate-x-1'
                          }`}
                          style={{ 
                            transitionDelay: `${skillIndex * 50}ms`
                          }}
                        >
                          <div className={`w-1 h-1 rounded-full mr-3 transition-all duration-300 ${
                            index === activeCategory ? 'bg-black w-2 h-2' : 'bg-gray-400'
                          }`}></div>
                          <span className={`text-sm transition-all duration-300 ${
                            index === activeCategory ? 'text-black font-medium' : 'text-gray-700'
                          }`}>
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden">
            <div className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              {/* Category Selector */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {skillCategories.map((category, index) => (
                  <button
                    key={category.title}
                    onClick={() => setActiveCategory(index)}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                      index === activeCategory
                        ? 'bg-black text-white font-medium'
                        : 'bg-black/10 text-gray-700 hover:bg-black/20'
                    }`}
                  >
                    {category.title.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Active Category Display */}
              <div className="max-w-2xl mx-auto">
                <div className={`
                  bg-gradient-to-br ${skillCategories[activeCategory].color} backdrop-blur-sm
                  border ${skillCategories[activeCategory].border} rounded-2xl p-8
                  transition-all duration-500 shadow-2xl shadow-black/10
                `}>
                  <div className="flex items-center mb-8">
                    <div className="p-4 rounded-xl bg-black/20 mr-4">
                      {skillCategories[activeCategory].icon}
                    </div>
                    <h3 className="text-2xl font-light text-black">
                      {skillCategories[activeCategory].title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skillCategories[activeCategory].skills.map((skill, skillIndex) => (
                      <div 
                        key={skill}
                        className="flex items-center p-3 bg-black/5 rounded-lg transition-all duration-300 hover:bg-black/10"
                        style={{ 
                          animationDelay: `${skillIndex * 50}ms`,
                          animation: 'fadeIn 0.5s ease-out forwards'
                        }}
                      >
                        <ChevronRight size={16} className="mr-3 text-gray-500" />
                        <span className="text-black font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
            <div className={`flex justify-center mt-12 pb-8 space-x-2 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            {skillCategories.map((_, index) => (
              <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeCategory 
                ? 'bg-black w-8' 
                : 'bg-black/30 hover:bg-black/50'
              }`}
              />
            ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
