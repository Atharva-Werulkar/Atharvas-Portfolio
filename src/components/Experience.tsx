import { Calendar, MapPin } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      role: "Flutter Developer Intern at ProCohat",
      duration: "Jun 2024 - Present",
      description: "Developed login authentication, implemented TDS calculation for 1,000+ users, and integrated email service API in Flutter. Enhanced dashboard with updated KPIs for live Play Store application.",
      location: "Nagpur, India"
    },
    {
      role: "Flutter Developer Intern at brewnbeer",
      duration: "Aug 2023 - Feb 2024",
      description: "Orchestrated the successful delivery of 3 high-stakes client projects, tailoring solutions to meet specific requirements; boosted client satisfaction scores by 20%.",
      location: "Mumbai, India"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
          My Experience
        </h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-gray-900 p-6 sm:p-8 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h3 className="text-xl font-semibold text-white mb-2 sm:mb-0">
                  {exp.role}
                </h3>
                <div className="flex items-center text-gray-400 text-sm">
                  <Calendar size={16} className="mr-2" />
                  {exp.duration}
                </div>
              </div>
              
              <div className="flex items-center text-gray-400 text-sm mb-4">
                <MapPin size={16} className="mr-2" />
                {exp.location}
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
