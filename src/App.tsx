import { useState } from 'react';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import AboutFull from './components/AboutFull';
import Structure from './components/Structure';
import Career from './components/Career';
import Eligibility from './components/Eligibility';
import Apply from './components/Apply';
import Governance from './components/Governance';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <AboutFull />
        <Structure />
        <Career />
        <Eligibility />
        <Apply />
        <Governance />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
