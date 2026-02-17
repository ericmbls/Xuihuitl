import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import BrandingSide from '../components/BrandingSide';
import './LoginPage.css';

export default function LoginPage({ setIsLoggedIn }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="form-side">
          <div className="form-card">
            <div className="tabs">
              <button
                className={`tab ${mode === 'login' ? 'active' : ''}`}
                onClick={() => setMode('login')}
              >
                Iniciar Sesión
              </button>
              <button
                className={`tab ${mode === 'register' ? 'active' : ''}`}
                onClick={() => setMode('register')}
              >
                Registrarse
              </button>
            </div>

            <LoginForm mode={mode} onLogin={() => setIsLoggedIn(true)} />
          </div>
        </div>
        <BrandingSide />
      </div>
    </div>
  );
}
