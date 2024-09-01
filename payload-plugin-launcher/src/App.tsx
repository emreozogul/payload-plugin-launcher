// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/main/Home';
import About from './pages/main/About';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route element={<MainLayout />}>
            <Route path="/main" element={<Home />} />
            <Route path="/main/about" element={<About />} />
            <Route path="*" element={<Navigate to="/main" />} />
          </Route>
        ) : (
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/auth/login" />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;