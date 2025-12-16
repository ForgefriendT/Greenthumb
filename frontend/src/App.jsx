import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

// Placeholder Components (will replace later)
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddPlant from './pages/AddPlant';
import Toast from './components/Toast';
import Forum from './pages/Forum';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('token'));
  const [toast, setToast] = React.useState(null); // { message, type }

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} showToast={showToast} />} />
        <Route path="/register" element={<Register showToast={showToast} />} />
        <Route path="/" element={<Dashboard showToast={showToast} />} />
        <Route path="/add-plant" element={<AddPlant showToast={showToast} />} />
        <Route path="/forum" element={<Forum showToast={showToast} />} />
      </Routes>
    </Router>
  );
}

export default App;
