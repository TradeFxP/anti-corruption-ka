import ACCNavigation from './components/ACCNavigation';
import ACCHero from './components/ACCHero';
import About from './components/About';
import VisionMission from './components/VisionMission';
import WhatWeDo from './components/WhatWeDo';
import ReportCorruption from './components/ReportCorruption';
import CitizenRights from './components/CitizenRights';
import JoinUs from './components/JoinUs';
import CodeOfEthics from './components/CodeOfEthics';
import Contact from './components/Contact';
import ACCFooter from './components/ACCFooter';

function App() {
  return (
    <div className="min-h-screen">
      <ACCNavigation />
      <ACCHero />
      <About />
      <VisionMission />
      <WhatWeDo />
      <ReportCorruption />
      <CitizenRights />
      <JoinUs />
      <CodeOfEthics />
      <Contact />
      <ACCFooter />
    </div>
  );
}

export default App;
