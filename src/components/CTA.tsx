import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

export default function CTA() {
  const { theme } = useTheme();
  const t = getThemeClasses(theme);

  return (
    <section className={`py-24 bg-gradient-to-br ${t.ctaBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to see JetFyX in action?
          </h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Share a few details and our team will walk you through the full platform — trading, risk, CRM,
            back-office, and IB portals — tailored to your brokerage's profile.
          </p>

          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 text-white">
                <CheckCircle2 className={`w-6 h-6 ${t.featureIconColor} flex-shrink-0`} />
                <span className="text-lg">Custom roadmap</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <CheckCircle2 className={`w-6 h-6 ${t.featureIconColor} flex-shrink-0`} />
                <span className="text-lg">Cost estimation</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <CheckCircle2 className={`w-6 h-6 ${t.featureIconColor} flex-shrink-0`} />
                <span className="text-lg">Migration plan</span>
              </div>
            </div>

            <button className={`group w-full md:w-auto px-12 py-5 bg-gradient-to-r ${t.buttonGradient} text-white text-xl font-bold rounded-xl ${t.buttonHover} transition shadow-2xl ${t.shadow} flex items-center justify-center gap-3 mx-auto`}>
              Request a Live Demo
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition" />
            </button>
          </div>

          <p className="text-slate-400 text-sm">
            We typically respond within 1–2 business days
          </p>
        </div>
      </div>
    </section>
  );
}
