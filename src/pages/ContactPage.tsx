import ACCNavigation from '../components/ACCNavigation';
import ACCFooter from '../components/ACCFooter';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <ACCNavigation />
      <main className="flex-grow mt-16">
        <Contact />
      </main>
      <ACCFooter />
    </div>
  );
}
