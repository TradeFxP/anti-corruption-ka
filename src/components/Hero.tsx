import { ArrowRight, TrendingUp, Shield, Zap, LineChart, Layers, Users, Building2, Wallet, BarChart3, Copy, Network } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';
import GlobalTradingAnimation from './GlobalTradingAnimation';

const modules = [
  { icon: LineChart, label: 'Trading Platform' },
  { icon: Layers, label: 'Liquidity Bridge' },
  { icon: Users, label: 'CRM' },
  { icon: Building2, label: 'Back Office' },
  { icon: Shield, label: 'Risk & Dealing' },
  { icon: Wallet, label: 'Payments' },
  { icon: Network, label: 'IB Portal' },
  { icon: Copy, label: 'Copy Trade' },
  { icon: BarChart3, label: 'Analytics' },
];

export default function Hero() {
  const { theme } = useTheme();
  const t = getThemeClasses(theme);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-slate-950 to-slate-900 z-0" />
      <GlobalTradingAnimation />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
        <div className="-mt-12 md:-mt-16 lg:-mt-20">
          <div className="inline-block mb-6">
            <span className={`px-5 py-2.5 ${t.badge} backdrop-blur-sm text-sm font-bold rounded-full tracking-wide`}>
              ONE PLUG-AND-PLAY TRADING STACK
            </span>
          </div>

          <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="relative z-10 block text-white">
              One unified
            </span>
            <span className="relative -mt-3 md:-mt-4 lg:-mt-5 z-20 block text-white">
              trading stack
            </span>
            <span className={`relative -mt-3 md:-mt-4 lg:-mt-5 z-30 block bg-gradient-to-r ${t.gradientText} bg-clip-text text-transparent text-6xl md:text-7xl lg:text-8xl font-black`}>
              for modern
            </span>
            <span className={`relative -mt-6 md:-mt-8 lg:-mt-10 z-40 block bg-gradient-to-r ${t.gradientText} bg-clip-text text-transparent text-6xl md:text-7xl lg:text-8xl font-black`}>
              Forex brokers
            </span>
          </h1>

          <p className={`text-lg md:text-xl ${t.accent} mb-6 font-medium`}>
            Replace 6–8 vendors with one powerful system.
          </p>

          <p className="text-2xl md:text-3xl text-white font-semibold mb-10">
            Launch faster. Operate leaner. Scale smarter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button className={`group px-8 py-4 bg-gradient-to-r ${t.buttonGradient} text-white text-lg font-bold rounded-lg ${t.buttonHover} transition shadow-2xl ${t.shadow} flex items-center justify-center gap-2`}>
              Book a Live Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-bold rounded-lg hover:bg-white/20 transition border-2 border-white/40">
              Talk to Our Team
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 text-white">
              <div className={`p-3 ${t.featureIcon} backdrop-blur-sm rounded-xl`}>
                <TrendingUp className={`w-6 h-6 ${t.featureIconColor}`} />
              </div>
              <div>
                <div className="font-bold text-lg mb-1">Fast Launch</div>
                <div className="text-sm text-slate-300 leading-relaxed">Go live in weeks, not months</div>
              </div>
            </div>

            <div className="flex items-start gap-4 text-white">
              <div className={`p-3 ${t.featureIcon} backdrop-blur-sm rounded-xl`}>
                <Shield className={`w-6 h-6 ${t.featureIconColor}`} />
              </div>
              <div>
                <div className="font-bold text-lg mb-1">Risk-First</div>
                <div className="text-sm text-slate-300 leading-relaxed">Compliant & secure operations</div>
              </div>
            </div>

            <div className="flex items-start gap-4 text-white">
              <div className={`p-3 ${t.featureIcon} backdrop-blur-sm rounded-xl`}>
                <Zap className={`w-6 h-6 ${t.featureIconColor}`} />
              </div>
              <div>
                <div className="font-bold text-lg mb-1">One System</div>
                <div className="text-sm text-slate-300 leading-relaxed">Replace fragmented tools</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative flex items-center justify-center" style={{ minHeight: '500px' }}>
            <div className="relative w-full max-w-[500px] aspect-square">
              {modules.map((module, index) => {
                const Icon = module.icon;

                return (
                  <div
                    key={index}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      animation: `rotateClockwise 20s linear infinite`,
                      animationDelay: `${-index * (20 / modules.length)}s`
                    }}
                  >
                    <div
                      className={`flex flex-col items-center gap-2 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 ${t.moduleCard} hover:bg-white/10 transition-all duration-300 group`}
                    >
                      <div className={`p-2 bg-gradient-to-br ${t.moduleIcon} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-slate-300 text-center font-medium group-hover:text-white transition-colors whitespace-nowrap">
                        {module.label}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className={`px-6 py-3 bg-gradient-to-r ${t.buttonGradient} rounded-full ${t.shadow} shadow-2xl`}>
                  <span className="text-white font-bold text-lg whitespace-nowrap">JetFyX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
