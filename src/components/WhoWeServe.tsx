import { Building, RefreshCw, Layers, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

const audiences = [
  {
    icon: Building,
    title: 'New Forex Brokerages',
    description: 'Launch quickly with a full stack instead of sourcing multiple vendors.',
  },
  {
    icon: RefreshCw,
    title: 'Existing Brokers on Legacy Tools',
    description: 'Replace expensive, fragmented systems with a unified, lean infrastructure.',
  },
  {
    icon: Layers,
    title: 'White-Label & Multi-Brand Operators',
    description: 'Manage multiple desks, brands, and regions from one central platform and reporting layer.',
  },
  {
    icon: TrendingUp,
    title: 'Wealth & Prop-Trading Desks',
    description: 'Handle high-touch clients, complex risk, and strategy-level analytics with detailed performance & exposure tools.',
  },
];

export default function WhoWeServe() {
  const { theme } = useTheme();
  const t = getThemeClasses(theme);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Who We Serve
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Built for brokers of all sizes and business models
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            const gradient = t.audienceGradient[index % t.audienceGradient.length];
            return (
              <div
                key={index}
                className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent ${t.audienceBorder}`}
              >
                <div className={`inline-flex p-4 bg-gradient-to-br ${gradient} rounded-xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className={`text-2xl font-bold text-slate-900 mb-4 ${t.audienceTitle} transition-colors`}>
                  {audience.title}
                </h3>

                <p className="text-lg text-slate-600 leading-relaxed">
                  {audience.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
