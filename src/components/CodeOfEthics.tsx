import { Award, Heart, Eye, Users, Ban } from 'lucide-react';

export default function CodeOfEthics() {
  const principles = [
    { icon: Award, text: 'Honesty' },
    { icon: Heart, text: 'Integrity' },
    { icon: Eye, text: 'Transparency' },
    { icon: Ban, text: 'Non-political & non-commercial service' },
    { icon: Users, text: 'People-focused justice' }
  ];

  return (
    <section id="ethics" className="py-16 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Code of Ethics</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-text/70 max-w-2xl mx-auto">
            The values that guide everything we do
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold text-text mb-8 text-center">
              We Stand For:
            </h3>
            <div className="space-y-4">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <div key={index} className="flex items-center space-x-6 p-5 bg-gradient-to-r from-light/20 to-white rounded-lg border border-light hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <span className="text-xl font-semibold text-text">{principle.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
