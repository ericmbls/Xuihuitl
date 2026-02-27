import { useState } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import './LoginPage.css';

export default function LoginPage({ setIsLoggedIn }) {
  const [mode, setMode] = useState('login');

  const isLogin = mode === 'login';

  return (
    <div className="login-page">
      <div className="login-container centered">
        <div className="form-card">
          <div className="tabs">
            <button
              className={`tab ${isLogin ? 'active' : ''}`}
              onClick={() => setMode('login')}
            >
              Iniciar Sesión
            </button>

            <button
              className={`tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setMode('register')}
            >
              Registrarse
            </button>
          </div>

          <LoginForm mode={mode} onLogin={() => setIsLoggedIn(true)} />
        </div>
      </div>
    </div>
  );
}