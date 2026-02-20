import { useState } from 'react';
import {
  FileText, Calendar, Filter, Download, Share2, MoreHorizontal,
  Droplets, DollarSign, TrendingUp, CheckCircle, Clock
} from 'lucide-react';
import Header from '../components/Header';
import './ReportesPage.css';

export default function ReportesPage({ onNavigate, currentPage, onLogout }) {
  // KPIs
  const kpis = [
    { title: 'Producción total', value: '2,450 Kg', badge: '+18%', sub: 'Este mes', icon: <SproutIcon />, color: '#FEF9C3' },
    { title: 'Ahorro de Agua', value: '2,660 L', badge: '-22%', sub: 'Este mes', icon: <Droplets size={20} color="#0EA5E9" />, color: '#E0F2FE' },
    { title: 'Ingresos', value: '$18,450', badge: '+24%', sub: 'Este mes', icon: <DollarSign size={20} color="#16A34A" />, color: '#DCFCE7' },
    { title: 'Eficiencia', value: '94%', badge: '+12%', sub: 'Promedio general', icon: <TrendingUp size={20} color="#EA580C" />, color: '#FFEDD5' },
  ];

  // Datos para gráfico Mock (Visualización CSS)
  const chartData = [
    { month: 'Agos', fresa: 60, lechuga: 70, pimiento: 72, tomate: 75 },
    { month: 'Sep', fresa: 62, lechuga: 68, pimiento: 65, tomate: 70 },
    { month: 'Oct', fresa: 0, lechuga: 0, pimiento: 0, tomate: 0 }, // Espacio vacío visible en diseño
    { month: 'Dic', fresa: 60, lechuga: 70, pimiento: 68, tomate: 74 },
  ];

  // Reportes recientes
  const reportes = [
    { id: 1, title: 'Reporte Semanal de Producción', date: '1 Feb 2026', type: 'Producción', size: '1.8 MB', icon: 'pdf' },
    { id: 2, title: 'Análisis de Consumo de Agua - Enero', date: '1 Feb 2026', type: 'Recursos', size: '1.8 MB', icon: 'pdf' },
    { id: 3, title: 'Estado de Salud de Cultivos', date: '31 Ene 2026', type: 'Agronómico', size: '3.2 MB', icon: 'pdf' },
    { id: 4, title: 'Informe Financiero Q4 2025', date: '28 Ene 2026', type: 'Financiero', size: '4.5 MB', icon: 'pdf' },
    { id: 5, title: 'Reporte de Inventario', date: '25 Ene 2026', type: 'Enero', size: 'Procesando', icon: 'loading' },
  ];

  return (
    <div className="dashboard-layout">
      <div className="dashboard-main">
        <Header onAddCultivo={() => { }} title="Reportes" onLogout={onLogout} />

        <div className="dashboard-content">
          {/* Header Section */}
          <div className="page-header-row">
            <div>
              <h1 className="page-title">Reportes y Análisis</h1>
              <p className="page-subtitle">Genera y Consulta reportes del sistema</p>
            </div>
            <button className="btn-primary">
              <FileText size={18} style={{ marginRight: 8 }} /> Generar Reporte
            </button>
          </div>

          {/* KPIs Section */}
          <div className="kpi-row">
            {kpis.map((kpi, index) => (
              <div key={index} className="kpi-card-report">
                <div className="kpi-top">
                  <div className="kpi-icon-wrapper">{kpi.icon}</div>
                  <span className="kpi-badge">{kpi.badge}</span>
                </div>
                <div className="kpi-content">
                  <span className="kpi-label">{kpi.title}</span>
                  <h3 className="kpi-number">{kpi.value}</h3>
                  <span className="kpi-sub-text">{kpi.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Gráfico Section */}
          <div className="chart-card-section">
            <div className="chart-controls">
              <div className="chart-tabs">
                <button className="chart-tab active">Producción</button>
                <button className="chart-tab">Consumo de Agua</button>
                <button className="chart-tab">Financiero</button>
              </div>
              <div className="chart-actions">
                <button className="btn-secondary"><Calendar size={14} /> Rango de Fechas</button>
                <button className="btn-secondary"><Filter size={14} /> Filtros</button>
                <button className="btn-secondary"><Download size={14} /> Exportar</button>
              </div>
            </div>

            <h3 className="chart-title">Producción por Cultivo</h3>

            <div className="chart-legend">
              <LegendItem color="#F472B6" label="Fresa" />
              <LegendItem color="#4ADE80" label="Lechuga" />
              <LegendItem color="#FCD34D" label="Pimiento" />
              <LegendItem color="#EF4444" label="Tomate" />
            </div>

            <div className="bar-chart-container">
              {chartData.map((data, i) => (
                <div key={i} className="chart-group">
                  {data.fresa > 0 ? (
                    <div className="bars-wrapper">
                      <div className="bar" style={{ height: `${data.fresa}%`, background: '#F472B6' }}></div>
                      <div className="bar" style={{ height: `${data.lechuga}%`, background: '#4ADE80' }}></div>
                      <div className="bar" style={{ height: `${data.pimiento}%`, background: '#FCD34D' }}></div>
                      <div className="bar" style={{ height: `${data.tomate}%`, background: '#EF4444' }}></div>
                    </div>
                  ) : (
                    <div className="bars-empty"></div>
                  )}
                  <span className="chart-label">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lista Reportes */}
          <div className="reportes-list-section">
            <h3>Reportes Generados</h3>
            <div className="reportes-stack">
              {reportes.map((rep) => (
                <div key={rep.id} className="reporte-item">
                  <div className="reporte-left">
                    <div className="file-icon-wrapper">
                      <FileText size={24} color="#8B6F47" />
                    </div>
                    <div className="reporte-details">
                      <h4>{rep.title}</h4>
                      <p>{rep.date} · {rep.type} · {rep.size}</p>
                    </div>
                  </div>
                  <div className="reporte-actions">
                    {rep.icon === 'loading' ? (
                      <button className="btn-processing">Procesando...</button>
                    ) : (
                      <>
                        <button className="btn-action-text"><Share2 size={16} /> Compartir</button>
                        <button className="btn-action-text"><Download size={16} /> Descargar</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="legend-item">
      <span className="dot" style={{ background: color }}></span>
      <span>{label}</span>
    </div>
  )
}

function SproutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#65A30D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 4.5-5.9 3.2-8 5.6-2.5-3 .9-6 4-9z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1.7-2.2 1.3-5-2-6-1.5-.7-3.4.4-1.2 3.4z" />
    </svg>
  )
}
