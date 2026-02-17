import { useState } from 'react';
import { Mail, Lock, AlertCircle, Facebook, Chrome, Eye, EyeOff } from 'lucide-react';
import './LoginForm.css';

export default function LoginForm({ onLogin, mode = 'login' }) {
  const [formData, setFormData] = useState({
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

    // Email validation
    if (!values.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido (ej. usuario@dominio.com)';
    }

    if (mode === 'register') {
      // Registration: stronger password rules
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

      // Confirm Password validation
      if (values.confirmPassword !== values.password) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    } else {
      // Login: only require password non-empty
      if (!values.password) {
        newErrors.password = 'La contraseña es requerida';
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;

    // Email Sanitization (Frontend)
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({ email: true, password: true, confirmPassword: true });

    if (Object.keys(validationErrors).length === 0) {
      // Front-only auth using localStorage
      const usersRaw = localStorage.getItem('users') || '[]';
      let users = [];
      try { users = JSON.parse(usersRaw); } catch (err) { users = []; }

      if (mode === 'register') {
        const exists = users.find(u => u.email === formData.email);
        if (exists) {
          alert('Ya existe un usuario con ese correo. Inicia sesión.');
          return;
        }

        // Save new user (store password as-is because this is demo front-only)
        users.push({ email: formData.email, password: formData.password });
        localStorage.setItem('users', JSON.stringify(users));

        // create fake token and save
        const token = btoa(`${formData.email}:${Date.now()}`);
        if (remember) localStorage.setItem('authToken', token);
        else sessionStorage.setItem('authToken', token);

        onLogin();
        return;
      }

      // mode === 'login'
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        const token = btoa(`${formData.email}:${Date.now()}`);
        if (remember) localStorage.setItem('authToken', token);
        else sessionStorage.setItem('authToken', token);

        onLogin();
      } else {
        alert('Credenciales inválidas. Verifica el correo y la contraseña o regístrate.');
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
        {/* Email Field */}
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

        {/* Password Field */}
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

        {/* Confirm Password Field (only for register) */}
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
