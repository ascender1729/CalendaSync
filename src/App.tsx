import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Auth } from './components/Auth';
import { Calendar } from './components/Calendar';
import { Settings } from './components/Settings';
import { AppErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider, ProtectedRoute } from './lib/auth';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppErrorBoundary>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <Dashboard>
                    <Calendar />
                  </Dashboard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Dashboard>
                    <Settings />
                  </Dashboard>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/calendar" replace />} />
          </Routes>
        </AppErrorBoundary>
      </AuthProvider>
    </Router>
  );
}

export default App;