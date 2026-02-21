import { useState, useMemo } from 'react';
import {
  Sprout, AlertCircle, Download, Activity,
  Droplets, CloudSun, CloudRain, Sun
} from 'lucide-react';
import Header from '../components/Header';
import AddCultivoModal from '../components/AddCultivoModal';
import './DashboardPage.css';

export default function DashboardPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  // 🔹 Memo para evitar recreación innecesaria
  const kpis = useMemo(() => ([
    { title: 'Total de cultivos', value: '12', sub: '+2 este mes', icon: <Sprout size={20} />, status: 'neutral' },
    { title: 'Alertas Activas', value: '3', sub: 'Ver Alertas', icon: <AlertCircle size={20} />, status: 'danger' },
    { title: 'Estado del Sistema', value: '98%', sub: 'Operativo', icon: <Download size={20} />, status: 'success' },
    { title: 'Salud Promedio', value: '94%', sub: 'Excelente', icon: <Activity size={20} />, status: 'success' },
  ]), []);

  const pronostico = useMemo(() => ([
    { day: 'Lun', icon: <Sun size={18} color="#F59E0B" />, temp: '24°' },
    { day: 'Mar', icon: <CloudSun size={18} color="#78716c" />, temp: '22°' },
    { day: 'Mié', icon: <CloudRain size={18} color="#78716c" />, temp: '20°' },
    { day: 'Jue', icon: <Sun size={18} color="#F59E0B" />, temp: '23°' },
    { day: 'Vie', icon: <Sun size={18} color="#F59E0B" />, temp: '25°' },
  ]), []);

  const zonasCultivo = useMemo(() => ([
    { name: 'Tomate', lugar: 'Campo A', humedad: '72%', temp: '24°C', status: 'ok' },
    { name: 'Lechuga', lugar: 'Hidropónico', humedad: '68%', temp: '22°C', status: 'ok' },
    { name: 'Pimientos', lugar: 'Invernadero', humedad: '65%', temp: '26°C', status: 'alert' },
    { name: 'Fresa', lugar: 'Campo B', humedad: '75%', temp: '21°C', status: 'ok' },
  ]), []);

  const heatmapZones = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      status: [6, 12].includes(i + 1) ? 'alert' : 'ok'
    })), []
  );

  return (
    <>
      

      <div className="dashboard-content">

        {/* KPIs */}
        <section className="kpi-grid">
          {kpis.map((kpi) => (
            <div key={kpi.title} className={`kpi-card ${kpi.status}`}>
              <div className="kpi-header">
                <span>{kpi.title}</span>
                <div className="kpi-icon">{kpi.icon}</div>
              </div>
              <div className="kpi-value">{kpi.value}</div>
              <div className={`kpi-sub ${kpi.status}`}>{kpi.sub}</div>
            </div>
          ))}
        </section>

        {/* Heatmap + Forecast */}
        <section className="middle-section">
          <div className="heatmap-card">
            <h3>Mapa de Calor</h3>
            <div className="heatmap-grid">
              {heatmapZones.map(zone => (
                <div key={zone.id} className={`heatmap-zone zone-${zone.status}`}>
                  Zona {zone.id}
                </div>
              ))}
            </div>
          </div>

          <div className="forecast-card">
            <h3>Pronóstico</h3>
            <div className="forecast-list">
              {pronostico.map(day => (
                <div key={day.day} className="forecast-item">
                  <span>{day.day}</span>
                  <div className="forecast-icon">{day.icon}</div>
                  <span className="forecast-temp">{day.temp}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Zonas */}
        <section className="zones-section">
          {zonasCultivo.map(zona => (
            <div
              key={zona.name}
              className={`zone-card ${zona.status === 'alert' ? 'zone-alert-border' : ''}`}
            >
              <div className="zone-header">
                <div>
                  <h4>{zona.name}</h4>
                  <span className="zone-location">{zona.lugar}</span>
                </div>
                {zona.status === 'ok'
                  ? <span className="check-icon">✓</span>
                  : <AlertCircle size={18} className="alert-icon-red" />
                }
              </div>

              <div className="zone-metrics">
                <div className="z-metric">
                  <Droplets size={14} />
                  <span>Humedad</span>
                  <strong>{zona.humedad}</strong>
                </div>
                <div className="z-metric">
                  <CloudSun size={14} />
                  <span>Temperatura</span>
                  <strong>{zona.temp}</strong>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Chart */}
        <section className="chart-section">
          <div className="chart-header">
            <h3>Caudal Actual</h3>
            <div className="chart-value-big">
              54.2 L/min
              <span>Promedio 24h</span>
            </div>
          </div>

          <div className="chart-container">
            <svg viewBox="0 0 1000 220" className="caudal-chart">
              <path
                d="M0,150 C100,140 200,140 300,170 C400,200 500,100 600,110 C700,120 800,180 900,190 L1000,200"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="3"
                opacity="0.4"
              />
              <path
                d="M0,140 C150,130 300,180 450,120 S750,150 1000,180"
                fill="none"
                stroke="#8B6F47"
                strokeWidth="4"
              />
              <line x1="0" y1="200" x2="1000" y2="200" stroke="#ddd" strokeWidth="2" />
            </svg>
          </div>
        </section>

      </div>

      <AddCultivoModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </>
  );
}