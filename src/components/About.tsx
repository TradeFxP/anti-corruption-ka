import { Heart, Users, Scale, Target } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">About Us</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text/80 leading-relaxed mb-6">
            The <strong>Anti-Corruption Committee – Karnataka</strong> is a public welfare organisation formed to fight corruption at every level of society. We work to educate citizens, support whistle-blowers, promote ethical governance, and encourage responsible administration.
          </p>
          <p className="text-lg text-text/80 leading-relaxed mb-12">
            We believe <strong>every citizen has the right to fair service</strong> without bribery, harassment, or misuse of power.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4 p-6 bg-light/20 rounded-lg">
              <Target className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-text mb-2">Our Purpose</h3>
                <p className="text-text/70">Fighting corruption at every level to create a fair and just society</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-light/20 rounded-lg">
              <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-text mb-2">Community Focus</h3>
                <p className="text-text/70">Supporting victims, educating citizens, and promoting accountability</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-light/20 rounded-lg">
              <Scale className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-text mb-2">Fair Service</h3>
                <p className="text-text/70">Every citizen deserves services without bribes or harassment</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-light/20 rounded-lg">
              <Heart className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-text mb-2">Ethical Governance</h3>
                <p className="text-text/70">Encouraging responsible administration and honest practices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
