import { Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const experiences = [
    {
      role: "Software Engineer - Mobile Developer at ProCohat Technologies",
      duration: "Aug 2025 - Present",
      description:
        "Leading the development of mobile applications using Flutter, collaborating with cross-functional teams to define and design new features.",
      location: "Nagpur, India",
    },
    {
      role: "Flutter Developer Intern at ProCohat",
      duration: "Jun 2024 - Aug 2025",
      description:
        "Developed login authentication, implemented TDS calculation for 1,000+ users, and integrated email service API in Flutter. Enhanced dashboard with updated KPIs for live Play Store application.",
      location: "Nagpur, India",
    },
    {
      role: "Flutter Developer Intern at brewnbeer",
      duration: "Aug 2023 - Feb 2024",
      description:
        "Orchestrated the successful delivery of 3 high-stakes client projects, tailoring solutions to meet specific requirements; boosted client satisfaction scores by 20%.",
      location: "Mumbai, India",
    },
  ];

  return (
    <section className="py-16 px-4 bg-black text-white min-h-screen relative overflow-hidden scroll-mt-20">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-extrabold text-white mb-4 font-heading">
            My Experience
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 h-full w-[2px] bg-gradient-to-b from-white/5 via-white/20 to-white/5"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative transition-all duration-1000 delay-${
                  index * 200
                } ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4">
                  <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm border border-white/30 animate-pulse"></div>
                </div>

                {/* Content */}
                <div
                  className={`ml-8 md:ml-0 ${
                    index % 2 === 0
                      ? "md:mr-[50%] md:pr-12"
                      : "md:ml-[50%] md:pl-12"
                  }`}
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300">
                    <div className="flex flex-col space-y-2 mb-4">
                      <h3 className="text-xl font-semibold text-white/90 font-heading">
                        {exp.role}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1.5" />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1.5" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed font-sans">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
