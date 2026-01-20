import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Footer from './components/Footer';
import Home from './pages/Home';
import ApplicationForm from './pages/ApplicationForm';
import './App.css';

// Wrapper component to handle layout conditionally
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isApplicationPage = location.pathname === '/application';

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="app-container">
      {/* Hide standard Navbar on Application Form for focus, or keep it? 
          user requested "progressive application flow" usually implies focused view.
          But let's keep it simple. If we want a focused view we can hide it.
          Let's hide the main navbar on the application page to avoid distraction.
      */}
      {!isApplicationPage && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/application" element={<ApplicationForm />} />
        </Routes>
      </main>

      {!isApplicationPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
