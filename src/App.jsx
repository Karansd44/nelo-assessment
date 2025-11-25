import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';

export default function App() {
  const [auth, setAuth] = useState(() => sessionStorage.getItem('auth') === 'true');

  useEffect(() => {
    if (auth) sessionStorage.setItem('auth', 'true');
    else sessionStorage.removeItem('auth');
  }, [auth]);

  return auth ? <Dashboard onLogout={() => setAuth(false)} /> : <Login onLogin={() => setAuth(true)} />;
}
