import { AlertCircle, Users, Scale } from 'lucide-react';
import { logo } from '../assets';

export default function ACCHero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-bg via-white to-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-2 bg-light/30 rounded-full overflow-hidden">
              <img src={logo} alt="ACC Logo" className="h-16 w-16 object-cover rounded-full" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6">
            Anti-Corruption Committee
            <br />
            <span className="text-primary">Andhra Pradesh</span>
          </h1>
          <p className="text-xl md:text-2xl text-secondary mb-4 max-w-3xl mx-auto">
            Working towards a transparent, honest, and corruption-free society
          </p>
          <p className="text-lg text-text/70 max-w-4xl mx-auto mb-8">
            Our mission is to create awareness, support victims, promote accountability, and work with authorities to ensure fairness and justice for every citizen in AP.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection('report')}
              className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-dark transition-colors shadow-lg hover:shadow-xl"
            >
              Report Corruption
            </button>
            <button
              onClick={() => scrollToSection('join')}
              className="px-8 py-3 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-light/20 transition-colors"
            >
              Join Our Movement
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <AlertCircle className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold text-text mb-2">Transparency</h3>
            <p className="text-text/70">Promoting open, honest governance at every level</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <Scale className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold text-text mb-2">Justice</h3>
            <p className="text-text/70">Ensuring fair treatment and accountability for all</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <Users className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold text-text mb-2">Support</h3>
            <p className="text-text/70">Standing with victims and whistle-blowers</p>
          </div>
        </div>
      </div>
    </section>
  );
}
