import { useState } from 'react';
import { Save, Globe, Smartphone, Bell, Shield, Sliders } from 'lucide-react';
import Header from '../components/Header';
import './AjustesPage.css';

export default function AjustesPage({ onNavigate, currentPage, onLogout }) {
    const [activeTab, setActiveTab] = useState('general');
    const [visualData, setVisualData] = useState({
        darkMode: false,
        animations: true,
        compactMode: false
    });

    const toggleVisual = (key) => {
        setVisualData(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="dashboard-layout">
                <div className="dashboard-main">
                    <Header onAddCultivo={() => { }} title="Ajustes" onLogout={onLogout} />

                <div className="dashboard-content">
                    {/* Header Row */}
                    <div className="page-header-row">
                        <div>
                            <h1 className="page-title">Configuración del Sistema</h1>
                            <p className="page-subtitle">Ajustes de preferencias y parámetros de Xihuitl</p>
                        </div>
                        <button className="btn-primary">
                            Guardar
                        </button>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="settings-tabs">
                        <button
                            className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
                            onClick={() => setActiveTab('general')}
                        >
                            General
                        </button>
                        <button
                            className={`settings-tab ${activeTab === 'notificaciones' ? 'active' : ''}`}
                            onClick={() => setActiveTab('notificaciones')}
                        >
                            Notificaciones
                        </button>
                        <button
                            className={`settings-tab ${activeTab === 'seguridad' ? 'active' : ''}`}
                            onClick={() => setActiveTab('seguridad')}
                        >
                            Seguridad
                        </button>
                        <button
                            className={`settings-tab ${activeTab === 'dispositivos' ? 'active' : ''}`}
                            onClick={() => setActiveTab('dispositivos')}
                        >
                            Dispositivos
                        </button>
                        <button
                            className={`settings-tab ${activeTab === 'avanzado' ? 'active' : ''}`}
                            onClick={() => setActiveTab('avanzado')}
                        >
                            Avanzado
                        </button>
                    </div>

                    {activeTab === 'general' && (
                        <div className="settings-content">
                            {/* Configuración Regional */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <Globe size={20} />
                                    <h3>Configuración Regional</h3>
                                </div>

                                <div className="form-grid-2">
                                    <div className="form-group">
                                        <label>Idioma del sistema</label>
                                        <div className="select-wrapper">
                                            <select defaultValue="es-mx">
                                                <option value="es-mx">Español México</option>
                                                <option value="en-us">English US</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Zona Horaria</label>
                                        <div className="select-wrapper">
                                            <select defaultValue="cst">
                                                <option value="cst">América/México_City(CST)</option>
                                                <option value="est">América/New_York(EST)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Sistema de Unidades</label>
                                        <div className="select-wrapper">
                                            <select defaultValue="metric">
                                                <option value="metric">Métrico (Kg, L, °C)</option>
                                                <option value="imperial">Imperial (Lb, Gal, °F)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Moneda</label>
                                        <div className="select-wrapper">
                                            <select defaultValue="mxn">
                                                <option value="mxn">MXN - Peso Mexicano</option>
                                                <option value="usd">USD - Dólar Estadounidense</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-grid-1" style={{ marginTop: '20px' }}>
                                    <div className="form-group">
                                        <label>Nombre de la Granja</label>
                                        <input type="text" defaultValue="Xihuitl Farms S.A de C.V." className="input-filled" />
                                    </div>
                                    <div className="form-group">
                                        <label>Ubicación</label>
                                        <input type="text" defaultValue="Jalisco, México" className="input-filled" />
                                    </div>
                                </div>
                            </div>

                            {/* Preferencias de Visualización */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <Sliders size={20} />
                                    <h3>Preferencias de Visualización</h3>
                                </div>

                                <div className="toggles-list">
                                    <div className="toggle-item">
                                        <div className="toggle-info">
                                            <h4>Modo Oscuro</h4>
                                            <p>Cambiar el tema visual de la aplicación</p>
                                        </div>
                                        <label className="switch">
                                            <input type="checkbox" checked={visualData.darkMode} onChange={() => toggleVisual('darkMode')} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>

                                    <div className="toggle-item">
                                        <div className="toggle-info">
                                            <h4>Animaciones</h4>
                                            <p>Habilitar transiciones y efectos visuales</p>
                                        </div>
                                        <label className="switch">
                                            <input type="checkbox" checked={visualData.animations} onChange={() => toggleVisual('animations')} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>

                                    <div className="toggle-item">
                                        <div className="toggle-info">
                                            <h4>Modo Compacto</h4>
                                            <p>Mostrar más información en menos espacio</p>
                                        </div>
                                        <label className="switch">
                                            <input type="checkbox" checked={visualData.compactMode} onChange={() => toggleVisual('compactMode')} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Placeholder for other tabs */}
                    {activeTab !== 'general' && (
                        <div className="empty-state">
                            <div className="empty-icon"><Shield size={48} color="#ddd" /></div>
                            <h3>Sección en construcción</h3>
                            <p>Esta configuración estará disponible pronto.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
