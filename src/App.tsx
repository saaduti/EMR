import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import DashboardLayout from './components/layouts/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import PatientList from './pages/patients/PatientList';
import PatientDetail from './pages/patients/PatientDetail';
import PatientForm from './pages/patients/PatientForm';
import Appointments from './pages/appointments/Appointments';
import VisitNotes from './pages/visits/VisitNotes';
import Billing from './pages/billing/Billing';
import LabReports from './pages/labs/LabReports';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="patients/:id" element={<PatientDetail />} />
            <Route path="patients/new" element={<PatientForm />} />
            <Route path="patients/:id/edit" element={<PatientForm />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="visits/:id" element={<VisitNotes />} />
            <Route path="billing" element={<Billing />} />
            <Route path="lab-reports" element={<LabReports />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;