
import { Code, Palette, Smartphone, Database, Globe, Zap, Layout, Settings, Users, Clock } from "lucide-react";

const Skills = () => {
  const skills = [
    { name: "HTML", icon: Code, category: "Frontend" },
    { name: "JavaScript", icon: Code, category: "Programming" },
    { name: "Sass/Scss", icon: Palette, category: "Styling" },
    { name: "ReactJS", icon: Globe, category: "Framework" },
    { name: "SQL", icon: Database, category: "Database" },
    { name: "ReactJS", icon: Globe, category: "Framework" },
    { name: "CSS", icon: Layout, category: "Styling" },
    { name: "Wordpress", icon: Settings, category: "CMS" },
    { name: "Bootstrap", icon: Layout, category: "Framework" },
    { name: "JavaScript", icon: Code, category: "Programming" }
  ];

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-16">
          My Skills
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  <skill.icon size={24} />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">
                  {skill.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
