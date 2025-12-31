import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Contact Us</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-light/20 to-white p-8 md:p-12 rounded-2xl shadow-xl border border-light">
            <h3 className="text-2xl font-bold text-text mb-8 text-center">
              Anti-Corruption Committee – Andhra Pradesh
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-text mb-1">Phone</h4>
                  <a href="tel:+919533055666" className="text-text/70 hover:text-primary transition-colors">+91 95330 55666</a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-text mb-1">Email</h4>
                  <a href="mailto:support@accap.org.in" className="text-text/70 hover:text-primary transition-colors">support@accap.org.in</a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-text mb-1">Office Address</h4>
                  <p className="text-text/70">Tirupati, Andhra Pradesh</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-text mb-1">Working Hours</h4>
                  <p className="text-text/70">Monday – Saturday | 10:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary text-white rounded-lg text-center">
              <p className="text-lg font-semibold">
                All communications are treated with strict confidentiality
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
