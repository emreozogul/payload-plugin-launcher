// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import {
  LoginPage,
  RegisterPage,
  PluginsPage,
  AnalyticsPage,
  StorePage,
  SettingsPage
} from './pages';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? ( // isAuthenticated 
          <Route element={<MainLayout />}>
            <Route path="/main/plugins" element={<PluginsPage />} />
            <Route path="/main/analytics" element={<AnalyticsPage />} />
            <Route path="/main/store" element={<StorePage />} />
            <Route path="/main/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/main/plugins" />} />
          </Route>
        ) : (
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/auth/login" />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;