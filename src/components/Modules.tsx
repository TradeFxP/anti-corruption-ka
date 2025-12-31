import {
  LineChart,
  Layers,
  Users,
  Building2,
  Shield,
  Wallet,
  Lock,
  BarChart3,
  Copy,
  Network,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

const modules = [
  {
    icon: LineChart,
    title: 'Trading Platform',
    description: 'Web & mobile terminals, real-time quotes & depth, advanced charting, order types, copy & algo-trading ready.',
  },
  {
    icon: Layers,
    title: 'Liquidity Aggregator & Bridge',
    description: 'Multi-LP connectivity, aggregated pricing, intelligent routing & markups, LP performance monitoring.',
  },
  {
    icon: Users,
    title: 'CRM & Client Portal',
    description: 'Seamless lead-to-live workflow, KYC/AML, support ticketing, client dashboard & self-service.',
  },
  {
    icon: Building2,
    title: 'Back Office & Accounting',
    description: 'Multi-currency wallets, internal ledger, deposits & withdrawals, full audit trails, regulator-ready reports.',
  },
  {
    icon: Shield,
    title: 'Risk & Dealing Desk',
    description: 'Real-time book view, exposure by symbol/group/client, A/B-book control, alerts, auto/manual hedging.',
  },
  {
    icon: Wallet,
    title: 'Payment & Wallet System',
    description: 'Card, bank & wallet integration, automated reconciliation, instant deposit/withdrawal workflows.',
  },
  {
    icon: Network,
    title: 'IB Portal',
    description: 'Dedicated portal for Introducing Brokers with hierarchical structure, commission tracking, and client management.',
  },
  {
    icon: Copy,
    title: 'Copy Trade',
    description: 'Advanced copy trading platform enabling signal providers and followers, automated trade replication, and performance analytics.',
  },
  {
    icon: Lock,
    title: 'Compliance & Security',
    description: 'Role-based access control, full action logs, secure hosting, automatic backups.',
  },
  {
    icon: BarChart3,
    title: 'Marketing & Analytics',
    description: 'Lead funnel, campaign tracking, revenue dashboards, KPI & ROI reporting, BI integration.',
  },
];

export default function Modules() {
  const { theme } = useTheme();
  const t = getThemeClasses(theme);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            All Broker Modules Included
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Everything you need to run a complete brokerage operation, integrated into one powerful platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <div
                key={index}
                className={`group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 ${t.moduleCard} transition-all duration-300`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 bg-gradient-to-br ${t.moduleIcon} rounded-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold text-white ${t.moduleTitle} transition-colors pt-2`}>
                    {module.title}
                  </h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {module.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
