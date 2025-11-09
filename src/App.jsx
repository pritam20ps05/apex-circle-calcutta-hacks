import { lazy, Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Theme from './Them/Theme.jsx';
import Hero from './Section/Hero.jsx';
import About from './Section/About.jsx';

// Lazy load below-the-fold components for zero latency
const Timeline = lazy(() => import('./Section/Timeline.jsx'));
const Tracks = lazy(() => import('./Section/Tracks.jsx'));
const PRIZES = lazy(() => import('./Section/PRIZES.jsx'));
const Host = lazy(() => import('./Section/Host.jsx'));
const Cohost = lazy(() => import('./Section/Cohost.jsx'));
const Mentors = lazy(() => import('./Section/Mentors.jsx'));
const Judges = lazy(() => import('./Section/Judges.jsx'));
const OurPartners = lazy(() => import('./Section/OurPartners.jsx'));
const Team = lazy(() => import('./Section/Team.jsx'));
const CommunityPartners = lazy(() => import('./components/CommunityPartners.jsx'));
const AvatarCardGenerator = lazy(() => import('./Section/AvatarCardGenerator.jsx'));
const FAQ = lazy(() => import('./Section/Faq.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));

// Loading fallback component
const SectionLoader = () => null;

function App() {
  return (
    <Theme>
      <Navbar />
      <Hero />
      <About />
      <Suspense fallback={<SectionLoader />}>
        <Timeline />
        <Tracks />
        <PRIZES />
        <Host />
        <Cohost />
        <Mentors />
        <Judges />
        <OurPartners />
        <Team />
        <CommunityPartners />
        <AvatarCardGenerator />
        <FAQ />
        <Footer />
      </Suspense>
    </Theme>
  );
}

export default App;
