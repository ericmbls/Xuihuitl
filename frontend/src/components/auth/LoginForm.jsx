import { useState } from 'react';
import { Mail, Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react';
import './LoginForm.css';

export default function LoginForm({ onLogin, mode = 'login' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = (values) => {
    const newErrors = {};

    if (!values.email) newErrors.email = 'El correo es requerido';
    if (!values.password) newErrors.password = 'La contraseña es requerida';
    if (mode === 'register' && !values.name)
      newErrors.name = 'El nombre es requerido';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === 'email' ? value.trim().toLowerCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';

    const body =
      mode === 'login'
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          };

    try {
      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Error en autenticación');

      const data = await res.json();
      localStorage.setItem('authToken', data.access_token);
      onLogin();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-header">
        <h1 className="form-title">
          {mode === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
        </h1>
        <p className="form-subtitle">
          {mode === 'login'
            ? 'Ingresa tus credenciales para acceder'
            : 'Completa los datos para registrarte'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="login-form" noValidate>

        {mode === 'register' && (
          <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
            <label>Nombre</label>
            <div className="input-wrapper">
              <User size={20} className="input-icon left" />
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                className="form-input has-icon-left"
                autoComplete="name"
              />
            </div>
            {errors.name && (
              <span className="error-message">
                <AlertCircle size={14} /> {errors.name}
              </span>
            )}
          </div>
        )}

        <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
          <label>Correo Electrónico</label>
          <div className="input-wrapper">
            <Mail size={20} className="input-icon left" />
            <input
              type="email"
              name="email"
              placeholder="correo@dominio.com"
              value={formData.email}
              onChange={handleChange}
              className="form-input has-icon-left"
              autoComplete="email"
            />
          </div>
          {errors.email && (
            <span className="error-message">
              <AlertCircle size={14} /> {errors.email}
            </span>
          )}
        </div>

        <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
          <label>Contraseña</label>
          <div className="input-wrapper">
            <Lock size={20} className="input-icon left" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Tu contraseña"
              value={formData.password}
              onChange={handleChange}
              className="form-input has-icon-left has-icon-right"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <span className="error-message">
              <AlertCircle size={14} /> {errors.password}
            </span>
          )}
        </div>

        {mode === 'register' && (
          <div className="form-group">
            <label>Rol</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
        )}

        <button type="submit" className="login-button">
          {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </button>

      </form>
    </div>
  );
}