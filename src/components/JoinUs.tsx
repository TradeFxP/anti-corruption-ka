import { Users, UserPlus, Briefcase, GraduationCap, Heart } from 'lucide-react';

export default function JoinUs() {
  const volunteers = [
    { icon: UserPlus, label: 'Volunteers' },
    { icon: Briefcase, label: 'Professionals' },
    { icon: GraduationCap, label: 'Students' },
    { icon: Heart, label: 'Socially Responsible Citizens' }
  ];

  return (
    <section id="join" className="py-16 bg-gradient-to-br from-light/20 via-bg to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Users className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Join Us</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-text/80 max-w-2xl mx-auto">
            Be a part of the movement
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl mb-8">
            <h3 className="text-2xl font-bold text-text mb-8 text-center">
              We Welcome:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {volunteers.map((volunteer, index) => {
                const Icon = volunteer.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex p-4 bg-light/40 rounded-full mb-3">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-text/80">{volunteer.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <p className="text-2xl font-bold text-text mb-6">
                Together we can build a better Andhra Pradesh
              </p>
              <button className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-dark transition-colors shadow-lg hover:shadow-xl text-lg">
                Volunteer With Us
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-xl text-center">
            <p className="text-lg font-semibold">
              Your involvement can make a real difference in creating a corruption-free society
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
