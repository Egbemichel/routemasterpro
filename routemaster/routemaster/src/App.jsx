/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import Footer from './components/Footer';
import ServicesPage from './pages/Services';
import './style/App.css';
import './style/Home.css';
import ScrollToTop from './components/ScrollToTop';
import TransitionWrapper from './components/TransitionWrapper';
import AdminDashboard from './pages/AdminDashboard';
import TrackingPage from './pages/TrackingPage';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import Loader from './components/Loader'; 

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Set loading to false once auth state is resolved
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Loader />; // Show a loading state while checking auth

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <TransitionWrapper>
                  <HomePage />
                </TransitionWrapper>
              }
            />
            <Route
              path="/about"
              element={
                <TransitionWrapper>
                  <AboutPage />
                </TransitionWrapper>
              }
            />
            <Route
              path="/services"
              element={
                <TransitionWrapper>
                  <ServicesPage />
                </TransitionWrapper>
              }
            />
            <Route path="/admin-register" element={<AdminRegister />} />
            <Route path="/admin-login" element={user ? <Navigate to="/admin-dashboard" /> : <AdminLogin />} />
            <Route
              path="/admin-dashboard"
              element={
                user ? (
                  <TransitionWrapper>
                    <AdminDashboard />
                  </TransitionWrapper>
                ) : (
                  <Navigate to="/admin-login" />
                )
              }
            />
            <Route
              path="/track/:trackingNumber"
              element={
                <TransitionWrapper>
                  <TrackingPage />
                </TransitionWrapper>
              }
            />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
