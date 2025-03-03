import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import HospitalListPage from './pages/HospitalListPage';
import HospitalDetailsPage from './pages/HospitalDetailsPage';
import CreateHospitalPage from './pages/CreateHospitalPage';
import EditHospitalPage from './pages/EditHospitalPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col">
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hospitals" element={<HospitalListPage />} />
            <Route path="/hospitals/:id" element={<HospitalDetailsPage />} />
            <Route path="/hospitals/create" element={<CreateHospitalPage />} />
            <Route path="/hospitals/edit/:id" element={<EditHospitalPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;