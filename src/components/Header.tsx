import { useState, useEffect } from "react";
import { Menu, X, ChevronUp } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const resumeLink = "https://drive.google.com/file/d/1txfMvHPsHlxUUv91X5mlD9lBzCC2kNOf/view?usp=sharing";

  const menuItems = [
    { label: "About Me", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact Me", href: "#contact" },
  ];

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Clear hash from URL without jumping
    history.pushState('', document.title, window.location.pathname + window.location.search);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash without jumping
      history.pushState({}, '', href);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-black/80 backdrop-blur-sm shadow-sm fixed w-full top-0 z-50 opacity-0 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button 
              onClick={scrollToTop}
              className="cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              <img src="/assets/logo.png" alt="Personal Logo" className="h-10 mb-4 sm:mb-0 p-1" />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-gray-300 hover:text-white transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button 
              className="hidden md:block bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200 transition-all duration-200 hover:scale-105 font-semibold"
              onClick={() => window.open(resumeLink, '_blank')}
            >
              Resume
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden transition-transform duration-200 hover:scale-110 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 animate-fade-in">
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                ))}
                <button 
                  className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200 self-start font-semibold"
                  onClick={() => window.open(resumeLink, '_blank')}
                >
                  Resume
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-white text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ChevronUp size={24} />
      </button>
    </>
  );
};

export default Header;
