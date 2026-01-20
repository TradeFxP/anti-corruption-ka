import { AlertCircle } from 'lucide-react';
import { logo } from '../assets';

export default function ACCFooter() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark text-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="ACC Logo" className="h-8 w-8 object-cover rounded" />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white leading-tight">Anti-Corruption Committee </span>
                <span className="text-xs font-bold text-white leading-tight"> ACC-Karnataka</span>
              </div>
            </div>
            <p className="text-sm text-light/70">
              Working towards a transparent, honest, and corruption-free Karnataka.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-secondary transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('vision')} className="hover:text-secondary transition-colors">
                  Vision & Mission
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('report')} className="hover:text-secondary transition-colors">
                  Report Corruption
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-secondary transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Get Involved</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => scrollToSection('join')} className="hover:text-secondary transition-colors">
                  Join Our Movement
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('rights')} className="hover:text-secondary transition-colors">
                  Know Your Rights
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('ethics')} className="hover:text-secondary transition-colors">
                  Code of Ethics
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/30 pt-8">
          <div className="bg-secondary/20 border border-secondary rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white mb-1">Disclaimer</h4>
                <p className="text-sm text-white">
                  We are a citizen-support organisation. We guide and assist but do not replace legal or government authorities.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-white">
            <p>&copy; {new Date().getFullYear()} Anti-Corruption Committee – Karnataka. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
