import { TrendingUp, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const t = getThemeClasses(theme);

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className={`bg-gradient-to-br ${t.footerLogo} p-2.5 rounded-lg shadow-lg`}>
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className={`text-2xl font-bold bg-gradient-to-r ${t.footerLogoText} bg-clip-text text-transparent`}>
                JetFyX
              </span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed text-lg max-w-lg">
              The all-in-one trading infrastructure built by brokers who've lived the pain of fragmented tools.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className={`p-2.5 bg-slate-800 ${t.footerSocial} rounded-lg transition`}
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`p-2.5 bg-slate-800 ${t.footerSocial} rounded-lg transition`}
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`p-2.5 bg-slate-800 ${t.footerSocial} rounded-lg transition`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Platform</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className={`text-slate-400 ${t.footerLink} transition`}>
                  Trading Platform
                </a>
              </li>
              <li>
                <a href="#" className={`text-slate-400 ${t.footerLink} transition`}>
                  Liquidity Bridge
                </a>
              </li>
              <li>
                <a href="#" className={`text-slate-400 ${t.footerLink} transition`}>
                  Risk Management
                </a>
              </li>
              <li>
                <a href="#" className={`text-slate-400 ${t.footerLink} transition`}>
                  CRM & Back Office
                </a>
              </li>
              <li>
                <a href="#" className={`text-slate-400 ${t.footerLink} transition`}>
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className={`text-slate-400 ${t.footerLink} transition`}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className={`text-slate-400 ${t.footerLink} transition`}>
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className={`text-slate-400 ${t.footerLink} transition`}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className={`text-slate-400 ${t.footerLink} transition`}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              &copy; {currentYear} JetFyX. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className={`text-slate-400 ${t.footerLink} text-sm transition`}>
                Privacy Policy
              </a>
              <a href="#" className={`text-slate-400 ${t.footerLink} text-sm transition`}>
                Terms of Service
              </a>
              <a href="#" className={`text-slate-400 ${t.footerLink} text-sm transition`}>
                Legal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
