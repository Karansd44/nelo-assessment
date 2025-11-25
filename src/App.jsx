import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';

export default function App() {
  const [auth, setAuth] = useState(() => sessionStorage.getItem('auth') === 'true'); // Session Management: Persist auth state
  useEffect(() => auth ? sessionStorage.setItem('auth', 'true') : sessionStorage.removeItem('auth'), [auth]);
  return auth ? <Dashboard onLogout={() => setAuth(false)} /> : <Login onLogin={() => setAuth(true)} />;
}
