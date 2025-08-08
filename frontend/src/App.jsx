 // src/App.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Shared/Login.jsx';
import NotFound from './pages/Shared/NotFound.jsx';
import { useLocation } from 'react-router-dom';

import {
  // Executive
  ExecutiveDashboard,
  AddEmployee,
  FillFuel,
  AddVehicle,
  UpdateMeasurement,
  ExecutiveBreakdowns,
  ExecutiveVehicles,

  // Operator
  OperatorDashboard,
  ActiveForms,
  NewForm,

  // Mechanic
  MechanicDashboard,
  MechanicBreakdowns,
  AcceptedBreakdowns,

  // Management
  ManagementDashboard,
  LiveTrips,
  FilterTrips,
  ManagementVehicles,
  ManagementUpdateMeasurement,
  IdleAnalysis,

  // Time Office
  TimeOfficeDashboard,
  AssignVehicle,
  TimeOfficeVehicles,
} from './pages';

const AppRouter = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
   const location = useLocation();

useEffect(() => {
  if (user && (location.pathname === '/login' || location.pathname === '/')) {
    switch (user.employeeType) {
      case 'EXECUTIVE':
        navigate('/executive/dashboard');
        break;
      case 'OPERATOR':
        navigate('/operator/dashboard');
        break;
      case 'MECHANIC':
        navigate('/mechanic/dashboard');
        break;
      case 'MANAGEMENT':
        navigate('/management/dashboard');
        break;
      case 'TIME_OFFICE':
        navigate('/time-office/dashboard');
        break;
      default:
        navigate('/unauthorized');
    }
  }
}, [user, navigate, location.pathname]);

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <Routes>
            {/* OPERATOR ROUTES */}
            <Route path="/operator/dashboard" element={<OperatorDashboard />} />
            <Route
              path="/operator/active-forms"
              element={<ProtectedRoute allowedRoles={['OPERATOR']}><ActiveForms /></ProtectedRoute>}
            />
            <Route
              path="/operator/new-form"
              element={<ProtectedRoute allowedRoles={['OPERATOR']}><NewForm /></ProtectedRoute>}
            />

            {/* TIME OFFICE ROUTES */}
            <Route path="/time-office/dashboard" element={<TimeOfficeDashboard />} />
            <Route
              path="/time-office/assign-vehicle"
              element={<ProtectedRoute allowedRoles={['TIME_OFFICE']}><AssignVehicle /></ProtectedRoute>}
            />
            <Route
              path="/time-office/vehicles"
              element={<ProtectedRoute allowedRoles={['TIME_OFFICE']}><TimeOfficeVehicles /></ProtectedRoute>}
            />

            {/* EXECUTIVE ROUTES */}
            <Route path="/executive/dashboard" element={<ExecutiveDashboard />} />
            <Route
              path="/executive/add-employee"
              element={<ProtectedRoute requiredPermissions={['ADD_EMPLOYEE']}><AddEmployee /></ProtectedRoute>}
            />
            <Route
              path="/executive/fill-fuel"
              element={<ProtectedRoute requiredPermissions={['FILL_FUEL']}><FillFuel /></ProtectedRoute>}
            />
            <Route
              path="/executive/add-vehicle"
              element={<ProtectedRoute requiredPermissions={['ADD_VEHICLE']}><AddVehicle /></ProtectedRoute>}
            />
            <Route
              path="/executive/update-measurement"
              element={<ProtectedRoute requiredPermissions={['UPDATE_MEASUREMENT_UNIT']}><UpdateMeasurement /></ProtectedRoute>}
            />
            <Route
              path="/executive/breakdowns"
              element={<ProtectedRoute requiredPermissions={['EXECUTIVE_VIEW']}><ExecutiveBreakdowns /></ProtectedRoute>}
            />
            <Route
              path="/executive/vehicles"
              element={<ProtectedRoute requiredPermissions={['EXECUTIVE_VIEW']}><ExecutiveVehicles /></ProtectedRoute>}
            />

            {/* MECHANIC ROUTES */}
            <Route path="/mechanic/dashboard" element={<MechanicDashboard />} />
            <Route
              path="/mechanic/breakdowns"
              element={<ProtectedRoute allowedRoles={['MECHANIC']}><MechanicBreakdowns /></ProtectedRoute>}
            />
            <Route
              path="/mechanic/accepted"
              element={<ProtectedRoute allowedRoles={['MECHANIC']}><AcceptedBreakdowns /></ProtectedRoute>}
            />

            {/* MANAGEMENT ROUTES */}
            <Route path="/management/dashboard" element={<ManagementDashboard />} />
            <Route
              path="/management/live-trips"
              element={<ProtectedRoute allowedRoles={['MANAGEMENT']}><LiveTrips /></ProtectedRoute>}
            />
            <Route
              path="/management/trips"
              element={<ProtectedRoute allowedRoles={['MANAGEMENT']}><FilterTrips /></ProtectedRoute>}
            />
            <Route
              path="/management/vehicles"
              element={<ProtectedRoute allowedRoles={['MANAGEMENT']}><ManagementVehicles /></ProtectedRoute>}
            />
            <Route
              path="/management/update-measurement"
              element={<ProtectedRoute allowedRoles={['MANAGEMENT']}><ManagementUpdateMeasurement /></ProtectedRoute>}
            />
            <Route
              path="/management/idle-analysis"
              element={<ProtectedRoute allowedRoles={['MANAGEMENT']}><IdleAnalysis /></ProtectedRoute>}
            />

            {/* FALLBACK */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <AppRouter />
  </Router>
);

export default App; 
