import { AlertTriangle, FileText, MapPin, Phone, Lock } from 'lucide-react';

export default function ReportCorruption() {
  const steps = [
    {
      icon: FileText,
      title: 'Collect Details & Evidence',
      description: 'Document what happened (only if safe to do so)'
    },
    {
      icon: MapPin,
      title: 'Note Names, Date & Place',
      description: 'Record specific information about the incident'
    },
    {
      icon: Phone,
      title: 'Contact Us Confidentially',
      description: 'Reach out through our secure channels'
    },
    {
      icon: Lock,
      title: 'We Ensure Privacy & Guidance',
      description: 'Your identity is protected, and we provide support'
    }
  ];

  return (
    <section id="report" className="py-16 bg-gradient-to-br from-light/30 via-bg to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Report Corruption</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-text/80 max-w-2xl mx-auto">
            If you have faced bribery, harassment, misuse of power, or injustice, we are here to help
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-light/40 rounded-full flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text mb-2">{step.title}</h3>
                      <p className="text-text/70">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border-l-4 border-primary">
          <div className="flex items-start space-x-4 mb-6">
            <AlertTriangle className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-text mb-2">Emergency Situations</h3>
              <p className="text-text/80">
                If you are in immediate danger or facing an emergency, please contact local law enforcement or the Anti-Corruption Bureau immediately.
              </p>
            </div>
          </div>
          <div className="bg-bg p-4 rounded-lg">
            <p className="text-sm text-text/70 italic">
              <strong>Your privacy is our priority.</strong> All reports are handled with strict confidentiality, and we provide guidance throughout the process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
