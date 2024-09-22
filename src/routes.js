import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RecruiterPage from './pages/RecruiterPage';
import FreelancerPage from './pages/FreelancerPage';
 import RoleSelection from './components/RoleSelection';
// import EditProfilePage from './pages/EditProfilePage';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/role-selection" element={<RoleSelection/>} />
        <Route path="/freelancer-home" element={<FreelancerPage/>} />
        <Route path="/recruiter-home" element={<RecruiterPage/>} />
        {/* <Route path="/edit-profile" element={<EditProfilePage />} /> */}
        {/* <Route path="*" element={<Navigate to="/freelancer-home" />}/> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
