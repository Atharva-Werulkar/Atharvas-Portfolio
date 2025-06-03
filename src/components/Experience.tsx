
import { Calendar, MapPin } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      role: "Lead Backend Engineer at Google",
      duration: "Aug 2018 - Present",
      description: "I am working across multiple teams including backend, frontend, and DevOps. I have helped in migrating the major application to React.js and React-Native and have overseen deployment of several machine learning models.",
      location: "Mountain View, CA"
    },
    {
      role: "Software Engineer at Youtube",
      duration: "Jan 2017 - Jul 2018",
      description: "Working on creating platforms involved in YouTube growth and engagement including developing apps used by 10M+ users and helping to drive international expansion.",
      location: "San Bruno, CA"
    },
    {
      role: "Junior Software Engineer at Apple",
      duration: "Jun 2015 - Dec 2016",
      description: "Worked on building consumer-focused web applications using React.js, Node.js, and PostgreSQL. Additionally gained experience working with iOS and Android mobile applications.",
      location: "Cupertino, CA"
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
