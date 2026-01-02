import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logo } from '../assets';

export default function ACCNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
    setIsHomeDropdownOpen(false);
  };

  const mainNavItems = [
    { id: 'what-we-do', label: 'What We Do' },
    { id: 'report', label: 'Report Corruption' },
    { id: 'rights', label: 'Citizen Rights' },
    { id: 'join', label: 'Join Us' },
  ];

  const homeDropdownItems = [
    { id: 'about', label: 'About' },
    { id: 'vision', label: 'Vision & Mission' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <img src={logo} alt="ACC Logo" className="h-10 w-10 object-cover rounded" />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-text leading-tight">  Anti-Corruption Committee</span>
              <span className="text-xs text-secondary leading-tight">ACC-Andhra Pradesh </span>
            </div>
          </div>

          <div className="hidden md:flex space-x-1">
            {/* Home Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsHomeDropdownOpen(true)}
              onMouseLeave={() => setIsHomeDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text hover:text-primary hover:bg-light/30 rounded-md transition-colors">
                Home
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isHomeDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-light rounded-lg shadow-lg py-2">
                  {homeDropdownItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-2 text-sm font-medium text-text hover:text-primary hover:bg-light/30 rounded-md transition-colors"
              >
                {item.label}
              </button>
            ))}
            
            {/* Contact and Auth Links */}
            <Link
              to="/contact"
              className="px-3 py-2 text-sm font-medium text-text hover:text-primary hover:bg-light/30 rounded-md transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/signin"
              className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary hover:from-dark hover:to-primary rounded-md transition-colors"
            >
              Sign In
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-text hover:bg-light/30"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-light">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Home Dropdown */}
            <div>
              <button
                onClick={() => setIsHomeDropdownOpen(!isHomeDropdownOpen)}
                className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-text hover:text-primary hover:bg-light/30 rounded-md"
              >
                Home
                <ChevronDown className={`w-4 h-4 transition-transform ${isHomeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isHomeDropdownOpen && (
                <div className="pl-4 space-y-1 mt-1">
                  {homeDropdownItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-light/30 rounded-md"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-text hover:text-primary hover:bg-light/30 rounded-md"
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Contact and Auth Links */}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left px-3 py-2 text-base font-medium text-text hover:text-primary hover:bg-light/30 rounded-md"
            >
              Contact
            </Link>
            <Link
              to="/signin"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-primary to-secondary hover:from-dark hover:to-primary rounded-md"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
