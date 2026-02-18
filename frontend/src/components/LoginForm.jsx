import { useState } from 'react';
import { Mail, Lock, AlertCircle, Facebook, Chrome, Eye, EyeOff } from 'lucide-react';
import './LoginForm.css';

export default function LoginForm({ onLogin, mode = 'login' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const validate = (values) => {
    const newErrors = {};
    if (!values.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido (ej. usuario@dominio.com)';
    }
    if (mode === 'register') {
      if (!values.password) {
        newErrors.password = 'La contraseña es requerida';
      } else {
        if (values.password.length < 8 || values.password.length > 12) {
          newErrors.password = 'La contraseña debe tener entre 8 y 12 caracteres';
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(values.password)) {
          newErrors.password = 'Debe incluir mayúscula, minúscula, número y carácter especial (!@#$%^&*)';
        }
        if (values.email && values.password.toLowerCase().includes(values.email.split('@')[0].toLowerCase())) {
          newErrors.password = 'La contraseña no puede contener partes del correo';
        }
      }
      if (values.confirmPassword !== values.password) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    } else {
      if (!values.password) {
        newErrors.password = 'La contraseña es requerida';
      }
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;
    if (name === 'email') {
      finalValue = value.trim().toLowerCase();
    }
    const newValues = { ...formData, [name]: finalValue };
    setFormData(newValues);
    if (touched[name]) {
      const fieldError = validate(newValues)[name];
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const validationErrors = validate(formData);
    setErrors(prev => ({ ...prev, [name]: validationErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({ email: true, password: true, confirmPassword: true });
    if (Object.keys(validationErrors).length === 0) {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const body = mode === 'login'
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };
      try {
        const res = await fetch(`http://localhost:3000${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error('Error en autenticación');
        const data = await res.json();
        const token = data.access_token || btoa(`${formData.email}:${Date.now()}`);
        if (remember) localStorage.setItem('authToken', token);
        else sessionStorage.setItem('authToken', token);
        onLogin();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="login-form-container">
      <div className="login-header">
        <h1 className="form-title">{mode === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}</h1>
        <p className="form-subtitle">{mode === 'login' ? 'Ingresa tus credenciales para acceder' : 'Rellena los datos para registrarte'}</p>
      </div>
      <form onSubmit={handleSubmit} className="login-form" noValidate>
        <div className={`form-group ${errors.email && touched.email ? 'has-error' : ''}`}>
          <label htmlFor="email">Correo Electrónico</label>
          <div className="input-wrapper">
            <Mail className="input-icon left" size={20} />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@dominio.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-input has-icon-left"
            />
          </div>
          {errors.email && touched.email && (
            <span className="error-message">
              <AlertCircle size={14} /> {errors.email}
            </span>
          )}
        </div>
        <div className={`form-group ${errors.password && touched.password ? 'has-error' : ''}`}>
          <label htmlFor="password">Contraseña</label>
          <div className="input-wrapper">
            <Lock className="input-icon left" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="8-12 caracteres"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-input has-icon-left has-icon-right"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {mode === 'register' && (
            <p className="password-hint">
              Mínimo 8-12 caracteres, mayúscula, minúscula, número y símbolo.
            </p>
          )}
          {errors.password && touched.password && (
            <span className="error-message">
              <AlertCircle size={14} /> {errors.password}
            </span>
          )}
        </div>
        {mode === 'register' && (
          <div className={`form-group ${errors.confirmPassword && touched.confirmPassword ? 'has-error' : ''}`}>
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <div className="input-wrapper">
              <Lock className="input-icon left" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input has-icon-left has-icon-right"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <span className="error-message">
                <AlertCircle size={14} /> {errors.confirmPassword}
              </span>
            )}
          </div>
        )}
        <div className="form-options">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Recordarme</span>
          </label>
          <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
        <button type="submit" className="login-button">
          {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </button>
        <div className="divider">
          <span>O continuar con</span>
        </div>
        <div className="social-login-grid">
          <button
            type="button"
            className="social-btn google"
            onClick={() => handleSocialLogin('Google')}
          >
            <Chrome size={20} /> Google
          </button>
          <button
            type="button"
            className="social-btn facebook"
            onClick={() => handleSocialLogin('Facebook')}
          >
            <Facebook size={20} /> Facebook
          </button>
        </div>
      </form>
    </div>
  );
}