import { useState } from 'react';
import {
  Sprout, AlertCircle, Download, Activity,
  Droplets, Thermometer, Wind, CloudSun, CloudRain, Sun
} from 'lucide-react';
import Header from '../components/Header';
import AddCultivoModal from '../components/AddCultivoModal';
import './DashboardPage.css';

export default function DashboardPage({ onNavigate, currentPage, onLogout }) {
  const [showAddModal, setShowAddModal] = useState(false);

  // Mocks
  const kpis = [
    { title: 'Total de cultivos', value: '12', sub: '+2 este mes', icon: <Sprout size={20} />, status: 'neutral' },
    { title: 'Alertas Activas', value: '3', sub: 'Ver Alertas', icon: <AlertCircle size={20} />, status: 'danger' },
    { title: 'Estado del Sistema', value: '98%', sub: 'Operativo', icon: <Download size={20} />, status: 'success' }, // Icono download aprox
    { title: 'Salud Promedio', value: '94%', sub: 'Excelente', icon: <Activity size={20} />, status: 'success' },
  ];

  const pronostico = [
    { day: 'Lun', icon: <Sun size={18} color="#F59E0B" />, temp: '24°' },
    { day: 'Mar', icon: <CloudSun size={18} color="#78716c" />, temp: '22°' },
    { day: 'Mié', icon: <CloudRain size={18} color="#78716c" />, temp: '20°' },
    { day: 'Jue', icon: <Sun size={18} color="#F59E0B" />, temp: '23°' },
    { day: 'Vie', icon: <Sun size={18} color="#F59E0B" />, temp: '25°' },
  ];

  const zonasCultivo = [
    { name: 'Tomate', lugar: 'Campo A', humedad: '72%', temp: '24°C', status: 'ok' },
    { name: 'Lechuga', lugar: 'Hidropónico', humedad: '68%', temp: '22°C', status: 'ok' },
    { name: 'Pimientos', lugar: 'Invernadero', humedad: '65%', temp: '26°C', status: 'alert' },
    { name: 'Fresa', lugar: 'Campo B', humedad: '75%', temp: '21°C', status: 'ok' },
  ];

  // Generar zonas para heatmap (1-16)
  const heatmapZones = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    status: [6, 12].includes(i + 1) ? 'alert' : 'ok' // Zonas 6 y 12 en alerta roja visualmente
  }));

  return (
    <div className="dashboard-layout">
      <div className="dashboard-main">
        <Header onAddCultivo={() => setShowAddModal(true)} title="Dashboard" onLogout={onLogout} />

        <div className="dashboard-content">
          {/* 1. KPIs */}
          <section className="kpi-grid">
            {kpis.map((kpi, idx) => (
              <div key={idx} className={`kpi-card ${kpi.status}`}>
                <div className="kpi-header">
                  <span>{kpi.title}</span>
                  <div className="kpi-icon">{kpi.icon}</div>
                </div>
                <div className="kpi-value">{kpi.value}</div>
                <div className={`kpi-sub ${kpi.status}`}>{kpi.sub}</div>
              </div>
            ))}
          </section>

          {/* 2. Heatmap & Pronóstico */}
          <section className="middle-section">
            <div className="heatmap-card">
              <h3>Mapa de Calor</h3>
              <div className="heatmap-grid">
                {heatmapZones.map((zone) => (
                  <div key={zone.id} className={`heatmap-zone zone-${zone.status}`}>
                    Zona {zone.id}
                  </div>
                ))}
              </div>
            </div>

            <div className="forecast-card">
              <h3>Pronóstico</h3>
              <div className="forecast-list">
                {pronostico.map((day, idx) => (
                  <div key={idx} className="forecast-item">
                    <span>{day.day}</span>
                    <div className="forecast-icon">{day.icon}</div>
                    <span className="forecast-temp">{day.temp}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Zonas Detalladas */}
          <section className="zones-section">
            {zonasCultivo.map((zona, idx) => (
              <div key={idx} className={`zone-card ${zona.status === 'alert' ? 'zone-alert-border' : ''}`}>
                <div className="zone-header">
                  <div>
                    <h4>{zona.name}</h4>
                    <span className="zone-location">{zona.lugar}</span>
                  </div>
                  {zona.status === 'ok' ? (
                    <span className="check-icon">✓</span>
                  ) : (
                    <AlertCircle size={18} className="alert-icon-red" />
                  )}
                </div>
                <div className="zone-metrics">
                  <div className="z-metric">
                    <Droplets size={14} />
                    <span>Humedad</span>
                    <strong>{zona.humedad}</strong>
                  </div>
                  <div className="z-metric">
                    <CloudSun size={14} /> {/* Icono temp */}
                    <span>Temperatura</span>
                    <strong>{zona.temp}</strong>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* 4. Gráfica Caudal */}
          <section className="chart-section">
            <div className="chart-header">
              <h3>Caudal Actual</h3>
              <div className="chart-value-big">
                54.2 L/min
                <span>Promedio 24h</span>
              </div>
            </div>
            <div className="chart-container">
              {/* SVG Simple Chart */}
              <svg viewBox="0 0 1000 200" className="caudal-chart">
                {/* Línea suave dibujada a mano (mock) */}
                <path d="M0,150 C100,140 200,140 300,170 C400,200 500,100 600,110 C700,120 800,180 900,190 L1000,200"
                  fill="none" stroke="#9ca3af" strokeWidth="3" opacity="0.5" />
                <path d="M0,140 C150,130 300,180 450,120 S750,150 1000,180"
                  fill="none" stroke="#8B6F47" strokeWidth="4" />
                {/* Ejes simulados */}
                <line x1="0" y1="190" x2="1000" y2="190" stroke="#ddd" strokeWidth="2" />
                <text x="10" y="210" fill="#999" fontSize="12">00:00</text>
                <text x="250" y="210" fill="#999" fontSize="12">04:00</text>
                <text x="500" y="210" fill="#999" fontSize="12">08:00</text>
                <text x="750" y="210" fill="#999" fontSize="12">12:00</text>
                <text x="950" y="210" fill="#999" fontSize="12">24:00</text>
              </svg>
            </div>
          </section>

        </div>
      </div>
      <AddCultivoModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
