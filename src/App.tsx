import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './data/store';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ClientDashboard } from './pages/client/ClientDashboard';
import { BookAppointment } from './pages/client/BookAppointment';
import { MyAppointments } from './pages/client/MyAppointments';
import { MyPets } from './pages/client/MyPets';
import { ProviderDashboard } from './pages/provider/ProviderDashboard';
import { AppointmentDetail } from './pages/provider/AppointmentDetail';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CreateProvider } from './pages/admin/CreateProvider';
import { ManageSchedule } from './pages/provider/ManageSchedule';
import { ManageAppointments } from './pages/admin/ManageAppointments';
import { ManageClients } from './pages/admin/ManageClients';
import { ManagePets } from './pages/admin/ManagePets';
import { ManageStaff } from './pages/admin/ManageStaff';
import { ManageServices } from './pages/admin/ManageServices';
import { Reports } from './pages/admin/Reports';
export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Client Routes */}
            <Route
              path="/client/dashboard"
              element={
              <ProtectedRoute allowedRoles={['client']}>
                  <ClientDashboard />
                </ProtectedRoute>
              } />
            
            <Route
              path="/client/book"
              element={
              <ProtectedRoute allowedRoles={['client']}>
                  <BookAppointment />
                </ProtectedRoute>
              } />
            
            <Route
              path="/client/appointments"
              element={
              <ProtectedRoute allowedRoles={['client']}>
                  <MyAppointments />
                </ProtectedRoute>
              } />
            
            <Route
              path="/client/pets"
              element={
              <ProtectedRoute allowedRoles={['client']}>
                  <MyPets />
                </ProtectedRoute>
              } />
            

            {/* Provider Routes */}
            <Route
              path="/provider/dashboard"
              element={
              <ProtectedRoute allowedRoles={['provider']}>
                  <ProviderDashboard />
                </ProtectedRoute>
              } />
            
            <Route
              path="/provider/appointment/:id"
              element={
                <ProtectedRoute allowedRoles={['provider']}>
                  <AppointmentDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/provider/schedule"
              element={
                <ProtectedRoute allowedRoles={['provider']}>
                  <ManageSchedule />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            
            <Route
              path="/admin/create-provider"
              element={
              <ProtectedRoute allowedRoles={['admin']}>
                  <CreateProvider />
                </ProtectedRoute>
              } />
            
            <Route
              path="/admin/appointments"
              element={
              <ProtectedRoute allowedRoles={['admin']}>
                  <ManageAppointments />
                </ProtectedRoute>
              } />
            
            <Route
              path="/admin/clients"
              element={
              <ProtectedRoute allowedRoles={['admin']}>
                  <ManageClients />
                </ProtectedRoute>
              } />
            
            <Route
              path="/admin/pets"
              element={
              <ProtectedRoute allowedRoles={['admin']}>
                  <ManagePets />
                </ProtectedRoute>
              } />
            
            <Route
              path="/admin/staff"
              element={
              <ProtectedRoute allowedRoles={['admin']}>
                  <ManageStaff />
                </ProtectedRoute>
              } />
            
            <Route
              path="/admin/services"
              element={
              <ProtectedRoute allowedRoles={['admin']}>
                  <ManageServices />
                </ProtectedRoute>
              } />
            
            <Route
              path="/admin/reports"
              element={
              <ProtectedRoute allowedRoles={['admin']}>
                  <Reports />
                </ProtectedRoute>
              } />
            

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>);

}