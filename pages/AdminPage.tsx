
import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import Button from '../components/ui/Button';
import PageTransition from '../components/layout/PageTransition';

const SECRET_KEY = 'AARTADMIN';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [key, setKey] = useState('');

  useEffect(() => {
    const storedAuth = sessionStorage.getItem('aart-admin-auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (key === SECRET_KEY) {
      sessionStorage.setItem('aart-admin-auth', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Incorrect secret key');
    }
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem('aart-admin-auth');
    setIsAuthenticated(false);
    setKey('');
  };

  if (isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <PageTransition>
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-md">
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tighter text-brand-dark">Admin Access</h1>
            <p className="mt-2 text-gray-600">Enter the secret key to manage products.</p>
          </div>
          <div className="flex flex-col space-y-4">
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Secret Key"
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition"
            />
            <Button onClick={handleLogin} size="lg">Unlock</Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminPage;
