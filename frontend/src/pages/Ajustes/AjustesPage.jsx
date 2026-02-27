import { useState, useEffect } from 'react';
import { Globe, Sliders, Shield, Bell, Lock, Cpu, Eye } from 'lucide-react';
import Header from '../../components/common/Header';
import './AjustesPage.css';

const TABS = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
  { id: 'seguridad', label: 'Seguridad', icon: Lock },
  { id: 'dispositivos', label: 'Dispositivos', icon: Cpu },
  { id: 'avanzado', label: 'Avanzado', icon: Sliders },
];

const VISUAL_PREFERENCES = [
  { key: 'darkMode', title: 'Modo Oscuro', desc: 'Cambiar el tema visual de la aplicación', icon: Eye },
];

export default function AjustesPage({ darkMode, setDarkMode, token }) {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    language: 'es-mx',
    farmName: 'Xihuitl Farms S.A de C.V.',
    location: 'Jalisco, México',
  });

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        console.log('Token usado:', token); // Para depurar
        const res = await fetch('/usuarios/preferences', { // CAMBIADO
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Status respuesta:', res.status); // Para depurar

        if (!res.ok) {
          console.error('Error HTTP:', res.status, res.statusText);
          return;
        }

        const data = await res.json().catch(() => null);
        console.log('Datos recibidos:', data); // Para depurar
        
        if (!data) return;

        if (data.darkMode !== undefined) setDarkMode(data.darkMode);
        if (data.language) setSettings(prev => ({ ...prev, language: data.language }));
        if (data.farmName) setSettings(prev => ({ ...prev, farmName: data.farmName }));
        if (data.location) setSettings(prev => ({ ...prev, location: data.location }));
      } catch (err) {
        console.error('Error cargando preferencias:', err);
      }
    };
    fetchPreferences();
  }, [token, setDarkMode]);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleToggleDarkMode = async () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    try {
      const res = await fetch('/usuarios/preferences', { // CAMBIADO
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ darkMode: newValue }),
      });

      if (!res.ok) {
        console.error('Error HTTP al guardar preferencia:', res.status, res.statusText);
      }
    } catch (err) {
      console.error('Error guardando preferencia:', err);
    }
  };

  const handleSave = async () => {
    const payload = { ...settings, darkMode };
    console.log('Guardar configuración:', payload);
    try {
      const res = await fetch('/usuarios/preferences', { // CAMBIADO
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error('Error HTTP al guardar configuración:', res.status, res.statusText);
      } else {
        console.log('Configuración guardada exitosamente');
      }
    } catch (err) {
      console.error('Error guardando configuración:', err);
    }
  };

  const renderGeneralTab = () => (
    <div className="settings-content">
      <div className="settings-section">
        <div className="section-header">
          <Globe size={22} strokeWidth={1.5} />
          <h3>Configuración Regional</h3>
        </div>
        <div className="form-grid-2">
          <div className="form-group">
            <label>Idioma del sistema</label>
            <div className="select-wrapper">
              <select
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
              >
                <option value="es-mx">Español México</option>
                <option value="en-us">English US</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-grid-1">
          <div className="form-group">
            <label>Nombre de la Granja</label>
            <input
              type="text"
              className="input-filled"
              value={settings.farmName}
              onChange={(e) => handleChange('farmName', e.target.value)}
              placeholder="Ej: Xihuitl Farms"
            />
          </div>
          <div className="form-group">
            <label>Ubicación</label>
            <input
              type="text"
              className="input-filled"
              value={settings.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Ej: Jalisco, México"
            />
          </div>
        </div>
      </div>
      <div className="settings-section">
        <div className="section-header">
          <Sliders size={22} strokeWidth={1.5} />
          <h3>Preferencias de Visualización</h3>
        </div>
        <div className="toggles-list">
          {VISUAL_PREFERENCES.map(({ key, title, desc, icon: Icon }) => (
            <div key={key} className="toggle-item">
              <div className="toggle-info">
                <div className="toggle-icon">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={handleToggleDarkMode}
                  aria-label={title}
                />
                <span className="slider round"></span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Configuración del Sistema</h1>
          <p className="page-subtitle">Ajustes de preferencias y parámetros de Xihuitl</p>
        </div>
        <button className="btn-primary" onClick={handleSave}>
          <span>Guardar cambios</span>
        </button>
      </div>
      <div className="settings-tabs">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`settings-tab ${activeTab === id ? 'active' : ''}`}
            onClick={() => setActiveTab(id)}
          >
            <Icon size={18} strokeWidth={1.5} />
            <span>{label}</span>
          </button>
        ))}
      </div>
      {activeTab === 'general' ? (
        renderGeneralTab()
      ) : (
        <div className="empty-state">
          <div className="empty-icon">
            <Shield size={48} strokeWidth={1} color="#8B6F47" opacity={0.3} />
          </div>
          <h3>Sección en construcción</h3>
          <p>Esta configuración estará disponible pronto.</p>
          <button className="btn-outline" onClick={() => setActiveTab('general')}>
            Volver a General
          </button>
        </div>
      )}
    </div>
  );
}