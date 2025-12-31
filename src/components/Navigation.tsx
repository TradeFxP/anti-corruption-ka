import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { logo } from '../assets';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-secondary p-1 rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
              <img src={logo} alt="JetFyX Logo" className="w-10 h-10 object-cover rounded" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-light to-secondary bg-clip-text text-transparent">
              JetFyX
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {/* Home with Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsHomeDropdownOpen(true)}
              onMouseLeave={() => setIsHomeDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-slate-300 hover:text-light font-medium transition">
                Home
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isHomeDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-2">
                  <a 
                    href="#about" 
                    className="block px-4 py-2 text-slate-300 hover:bg-primary/20 hover:text-light transition"
                  >
                    About
                  </a>
                  <a 
                    href="#vision" 
                    className="block px-4 py-2 text-slate-300 hover:bg-primary/20 hover:text-light transition"
                  >
                    Vision & Mission
                  </a>
                </div>
              )}
            </div>

            <a href="#platform" className="text-slate-300 hover:text-light font-medium transition">
              Platform
            </a>
            <a href="#modules" className="text-slate-300 hover:text-light font-medium transition">
              Modules
            </a>
            <a href="#pricing" className="text-slate-300 hover:text-light font-medium transition">
              Pricing
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-light transition">
              Sign In
            </button>
            <button className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-primary to-secondary hover:from-dark hover:to-primary rounded-lg transition shadow-md hover:shadow-primary/30">
              Request Demo
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-light transition"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800">
          <div className="px-4 py-4 space-y-3">
            <div className="space-y-1">
              <button 
                onClick={() => setIsHomeDropdownOpen(!isHomeDropdownOpen)}
                className="flex items-center justify-between w-full text-slate-300 hover:text-light font-medium py-2 transition"
              >
                Home
                <ChevronDown className={`w-4 h-4 transition-transform ${isHomeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isHomeDropdownOpen && (
                <div className="pl-4 space-y-1">
                  <a href="#about" className="block text-slate-400 hover:text-light py-2 transition">
                    About
                  </a>
                  <a href="#vision" className="block text-slate-400 hover:text-light py-2 transition">
                    Vision & Mission
                  </a>
                </div>
              )}
            </div>
            <a href="#platform" className="block text-slate-300 hover:text-light font-medium py-2 transition">
              Platform
            </a>
            <a href="#modules" className="block text-slate-300 hover:text-light font-medium py-2 transition">
              Modules
            </a>
            <a href="#pricing" className="block text-slate-300 hover:text-light font-medium py-2 transition">
              Pricing
            </a>
            <div className="pt-3 space-y-2">
              <button className="w-full px-5 py-2.5 text-sm font-medium text-slate-300 border border-slate-700 rounded-lg hover:border-primary hover:text-light transition">
                Sign In
              </button>
              <button className="w-full px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-primary to-secondary hover:from-dark hover:to-primary rounded-lg transition shadow-md">
                Request Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
