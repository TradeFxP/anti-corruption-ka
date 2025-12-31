import { BookOpen, Scale, Megaphone, Users, Link, FileText } from 'lucide-react';

export default function WhatWeDo() {
  const activities = [
    {
      icon: BookOpen,
      title: 'Awareness Programs & Workshops',
      description: 'Educational sessions to inform citizens about their rights and anti-corruption measures'
    },
    {
      icon: Scale,
      title: 'Legal & Moral Guidance',
      description: 'Support and direction for victims navigating the system'
    },
    {
      icon: Megaphone,
      title: 'Anti-Corruption Campaigns',
      description: 'Public initiatives to raise awareness and drive change'
    },
    {
      icon: Users,
      title: 'Youth & Community Engagement',
      description: 'Building a corruption-free future through education and involvement'
    },
    {
      icon: Link,
      title: 'Collaboration with Authorities',
      description: 'Working with government bodies and NGOs for systemic change'
    },
    {
      icon: FileText,
      title: 'Public Participation & Reporting',
      description: 'Encouraging citizens to report and stand against corruption'
    }
  ];

  return (
    <section id="what-we-do" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">What We Do</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-text/70 max-w-2xl mx-auto">
            Our comprehensive approach to fighting corruption and building a transparent society
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="bg-gradient-to-br from-light/20 to-white p-6 rounded-xl border border-light hover:shadow-lg transition-shadow">
                <div className="p-3 bg-primary rounded-lg w-fit mb-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text mb-3">{activity.title}</h3>
                <p className="text-text/70">{activity.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
