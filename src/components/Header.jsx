import { useState } from "react";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className={`block lg:hidden fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 border-b border-gray-800 h-14 flex items-center transition-all duration-300 ${
      isSidebarOpen ? 'bg-black/50 backdrop-blur-md' : 'bg-black'
    }`}>
      <div className="flex items-center justify-between w-full gap-4">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="/logo/textlogo.png"
            alt="CoinGuard Logo"
            className={`h-6 w-auto object-contain transition-all duration-300 ${
              isSidebarOpen ? 'blur-sm opacity-70' : ''
            }`}
          />
        </div>

        {/* Hamburger Button */}
        <button
          className="relative w-6 h-6 flex items-center justify-center"
          onClick={toggleSidebar}
        >
          <span
            className={`absolute h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${
              isSidebarOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-0.5 w-full bg-white transition-all duration-300 ease-in-out ${
              isSidebarOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${
              isSidebarOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;  
