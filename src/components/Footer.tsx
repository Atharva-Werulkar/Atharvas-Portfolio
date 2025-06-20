const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-4 sm:px-6 lg:px-8 border-t border-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <img src="/assets/logo.png" alt="Personal Logo" className="h-10 mb-4 sm:mb-0" />
          
          <div className="text-gray-400 text-sm">
            © 2025 Atharva Werulkar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
