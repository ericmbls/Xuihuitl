import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import BrandingSide from '../components/BrandingSide';
import './LoginPage.css';
import { useNotification } from '../components/NotificationProvider';

export default function LoginPage({ setIsLoggedIn }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const { addToast } = useNotification();

  const handleLogin = (modeReceived) => {
    setIsLoggedIn(true);
    if (modeReceived === 'login') {
      addToast('Inicio de sesión exitoso', 'success');
    } else if (modeReceived === 'register') {
      addToast('Registro exitoso', 'success');
    } else {
      addToast('Autenticación exitosa', 'success');
    }
  };

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

            <LoginForm mode={mode} onLogin={handleLogin} />
          </div>
        </div>
        <BrandingSide />
      </div>
    </div>
  );
}
