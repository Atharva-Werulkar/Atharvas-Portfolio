
const Skills = () => {
  const skillCategories = [
    {
      title: "Mobile & Cross-Platform",
      skills: ["Flutter", "Dart", "Bloc Pattern", "Provider", "JSON-based Dynamic UI"],
      delay: "0ms"
    },
    {
      title: "Backend & APIs",
      skills: ["Node.js", "Express.js", "Supabase", "Firebase", "REST APIs", "WebSocket"],
      delay: "100ms"
    },
    {
      title: "Database & Storage",
      skills: ["PostgreSQL", "Firebase Firestore", "Local Storage", "Hive"],
      delay: "200ms"
    },
    {
      title: "Cloud & Tools",
      skills: ["Supabase Studio", "Firebase Console", "Git", "GitHub Actions"],
      delay: "300ms"
    },
    {
      title: "AI/ML & Other",
      skills: ["SRGAN", "ESRGAN", "SRCNN", "Salesforce Apex", "Figma"],
      delay: "400ms"
    },
    {
      title: "Dev Practices",
      skills: ["Clean Architecture", "Feature-first Development", "Offline Sync", "Real-time Updates"],
      delay: "500ms"
    }
  ];

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 opacity-0 animate-fade-in">
            🛠 Tech Stack
          </h2>
          <p className="text-xl text-gray-600 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Technologies and tools I work with
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={category.title} 
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 opacity-0 animate-fade-in border border-gray-100"
              style={{ animationDelay: category.delay }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {category.title}
              </h3>
              
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skill} 
                    className="flex items-center space-x-2 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${parseInt(category.delay) + (skillIndex * 50)}ms` }}
                  >
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
