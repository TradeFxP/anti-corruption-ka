import { CheckCircle, Shield } from 'lucide-react';

export default function CitizenRights() {
  const rights = [
    'Receive services without bribes',
    'Be treated with dignity',
    'Report corruption without fear',
    'Seek justice under the law'
  ];

  return (
    <section id="rights" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Citizen Rights</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-light/20 to-white p-8 md:p-12 rounded-2xl shadow-xl border border-light">
            <h3 className="text-2xl font-bold text-text mb-8 text-center">
              Every Citizen Has the Right To:
            </h3>
            <div className="space-y-6">
              {rights.map((right, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="h-7 w-7 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-text font-medium">{right}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-primary text-white p-6 rounded-xl text-center">
            <p className="text-lg font-semibold">
              Know your rights. Exercise your rights. Stand up for your rights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
