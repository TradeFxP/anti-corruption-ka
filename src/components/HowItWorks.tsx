import { Search, Settings, TestTube, Rocket } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery & Architecture',
    description: 'We map your business model, regulation needs, instruments, and target regions. Then design the ideal JetFyX setup: platform, LPs, CRM flow, risk model, IB network.',
  },
  {
    number: '02',
    icon: Settings,
    title: 'Configuration & Integration',
    description: 'We configure trading instruments, client groups, markups, commission plans; connect PSPs, banks, liquidity providers.',
  },
  {
    number: '03',
    icon: TestTube,
    title: 'Migration & Testing',
    description: 'If migrating from legacy tools: data migration, UAT, stress & risk testing, client & exposure workflows tested for stability.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Go-live & Ongoing Support',
    description: 'We launch your brokerage, monitor infra health, train your dealers & back-office teams, and help you scale as you grow.',
  },
];

export default function HowItWorks() {
  const { theme } = useTheme();
  const t = getThemeClasses(theme);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Go live in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className={`bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 h-full border-2 border-slate-200 ${t.stepBorder} transition-all duration-300 hover:shadow-xl`}>
                  <div className="mb-6">
                    <div className={`text-5xl font-bold ${t.stepNumber} mb-4`}>
                      {step.number}
                    </div>
                    <div className={`inline-flex p-4 bg-gradient-to-br ${t.stepIcon} rounded-xl shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className={`w-8 h-0.5 bg-gradient-to-r ${t.stepConnector}`}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
