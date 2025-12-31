import { Eye, Target, CheckCircle } from 'lucide-react';

export default function VisionMission() {
  const missionPoints = [
    'Create awareness about citizen rights',
    'Encourage ethical governance',
    'Support victims of corruption',
    'Promote accountability in public and private systems',
    'Build a strong, responsible civil society'
  ];

  return (
    <section id="vision" className="py-16 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-light/30 rounded-lg mr-4">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-text">Our Vision</h2>
            </div>
            <p className="text-xl text-text/80 leading-relaxed">
              A corruption-free Andhra Pradesh where <strong>honesty, transparency, and justice</strong> are everyday values.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-light/30 rounded-lg mr-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-text">Our Mission</h2>
            </div>
            <ul className="space-y-3">
              {missionPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mr-3 mt-0.5" />
                  <span className="text-text/80">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
