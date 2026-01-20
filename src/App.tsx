import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Footer from './components/Footer';
import Home from './pages/Home';
import ApplicationForm from './pages/ApplicationForm';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import ApplicantsList from './pages/admin/ApplicantsList';
import './App.css';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin-login" replace />;
};

// Wrapper component to handle layout conditionally
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isApplicationPage = location.pathname === '/application';
  const isAdminPage = location.pathname.startsWith('/admin');

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  // Admin Layout Handling (No Navbar/Footer)
  if (isAdminPage && location.pathname !== '/admin-login') {
    return (
      <Routes>
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="applicants" element={<ApplicantsList />} />
          <Route path="templates" element={<div style={{ padding: '2rem' }}>Email Templates coming soon...</div>} />
          <Route path="settings" element={<div style={{ padding: '2rem' }}>Settings coming soon...</div>} />
          {/* Default redirect to dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    );
  }

  // Admin Login (Standalone)
  if (location.pathname === '/admin-login') {
    return (
      <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    );
  }

  // Public Pages Layout
  return (
    <div className="app-container">
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
