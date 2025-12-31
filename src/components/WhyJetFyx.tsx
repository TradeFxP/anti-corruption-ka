import { CheckCircle2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

export default function WhyJetFyx() {
  const { theme } = useTheme();
  const t = getThemeClasses(theme);

  const benefits = [
    'One unified interface for clients, dealers, back-office, IBs, and management',
    'Transparent, predictable pricing — no surprise plug-in costs or hidden fees',
    'A risk-first architecture that supports compliant, secure operations from day one',
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Why JetFyX
          </h2>
          <p className="text-2xl text-slate-700 font-semibold max-w-3xl mx-auto">
            Stop patching tools. Run your brokerage on a single brain.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 md:p-12 mb-8">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Most brokers today juggle multiple platforms — each solving one part of the stack. Trading terminals, CRM,
              liquidity bridges, back-office, payment tools — all with separate logins, pricing models, and integration headaches.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              <span className="font-bold text-slate-900">JetFyX is different:</span> we've built a fully integrated,
              vendor-agnostic infrastructure — designed by a team that has built and run brokerages across regulated
              and high-demand markets.
            </p>
          </div>

          <div className={`bg-gradient-to-br ${t.benefitBg} rounded-2xl p-8 md:p-12 border-2 ${t.benefitBorder}`}>
            <h3 className="text-2xl font-bold text-slate-900 mb-8">
              With JetFyX you get:
            </h3>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className={`w-6 h-6 ${t.checkColor}`} />
                  </div>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
