import { useState } from 'react';
import { Globe, Sliders, Shield } from 'lucide-react';
import Header from '../components/Header';
import './AjustesPage.css';

export default function AjustesPage() {
  const [activeTab, setActiveTab] = useState('general');

  const [settings, setSettings] = useState({
    language: 'es-mx',
    timezone: 'cst',
    units: 'metric',
    currency: 'mxn',
    farmName: 'Xihuitl Farms S.A de C.V.',
    location: 'Jalisco, México',
    darkMode: false,
    animations: true,
    compactMode: false,
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log('Guardar configuración:', settings);
    // Aquí después conectas con backend
  };

  return (
    <>
      <div className="dashboard-content">

        {/* Header */}
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Configuración del Sistema</h1>
            <p className="page-subtitle">
              Ajustes de preferencias y parámetros de Xihuitl
            </p>
          </div>
          <button className="btn-primary" onClick={handleSave}>
            Guardar
          </button>
        </div>

        {/* Tabs */}
        <div className="settings-tabs">
          {['general', 'notificaciones', 'seguridad', 'dispositivos', 'avanzado']
            .map(tab => (
              <button
                key={tab}
                className={`settings-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
        </div>

        {activeTab === 'general' && (
          <div className="settings-content">

            {/* Regional */}
            <div className="settings-section">
              <div className="section-header">
                <Globe size={20} />
                <h3>Configuración Regional</h3>
              </div>

              <div className="form-grid-2">

                <div className="form-group">
                  <label>Idioma del sistema</label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                  >
                    <option value="es-mx">Español México</option>
                    <option value="en-us">English US</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Zona Horaria</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                  >
                    <option value="cst">América/México_City (CST)</option>
                    <option value="est">América/New_York (EST)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Sistema de Unidades</label>
                  <select
                    value={settings.units}
                    onChange={(e) => handleChange('units', e.target.value)}
                  >
                    <option value="metric">Métrico (Kg, L, °C)</option>
                    <option value="imperial">Imperial (Lb, Gal, °F)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Moneda</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => handleChange('currency', e.target.value)}
                  >
                    <option value="mxn">MXN - Peso Mexicano</option>
                    <option value="usd">USD - Dólar Estadounidense</option>
                  </select>
                </div>

              </div>

              <div className="form-grid-1">

                <div className="form-group">
                  <label>Nombre de la Granja</label>
                  <input
                    type="text"
                    value={settings.farmName}
                    onChange={(e) => handleChange('farmName', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Ubicación</label>
                  <input
                    type="text"
                    value={settings.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                  />
                </div>

              </div>
            </div>

            {/* Visual */}
            <div className="settings-section">
              <div className="section-header">
                <Sliders size={20} />
                <h3>Preferencias de Visualización</h3>
              </div>

              <div className="toggles-list">

                {[
                  { key: 'darkMode', title: 'Modo Oscuro', desc: 'Cambiar el tema visual de la aplicación' },
                  { key: 'animations', title: 'Animaciones', desc: 'Habilitar transiciones y efectos visuales' },
                  { key: 'compactMode', title: 'Modo Compacto', desc: 'Mostrar más información en menos espacio' },
                ].map(item => (
                  <div key={item.key} className="toggle-item">
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={settings[item.key]}
                        onChange={() => handleToggle(item.key)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                ))}

              </div>
            </div>

          </div>
        )}

        {activeTab !== 'general' && (
          <div className="empty-state">
            <div className="empty-icon">
              <Shield size={48} color="#ddd" />
            </div>
            <h3>Sección en construcción</h3>
            <p>Esta configuración estará disponible pronto.</p>
          </div>
        )}

      </div>
    </>
  );
}