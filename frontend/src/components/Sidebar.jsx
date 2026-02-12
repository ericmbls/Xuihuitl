import { LayoutDashboard, Sprout, BarChart3, Users, Settings } from 'lucide-react';
import logo from '../assets/logo.png';
import './Sidebar.css';

export default function Sidebar({ onNavigate, currentPage }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src={logo} alt="Xihuitl" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
          <h1>Xihuitl</h1>
        </div>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => onNavigate('dashboard')}
        >
          <span className="nav-icon"><LayoutDashboard size={20} /></span>
          <span>Dashboard</span>
        </button>
        <button
          className={`nav-item ${currentPage === 'cultivos' ? 'active' : ''}`}
          onClick={() => onNavigate('cultivos')}
        >
          <span className="nav-icon"><Sprout size={20} /></span>
          <span>Cultivos</span>
        </button>
        <button
          className={`nav-item ${currentPage === 'reportes' ? 'active' : ''}`}
          onClick={() => onNavigate('reportes')}
        >
          <span className="nav-icon"><BarChart3 size={20} /></span>
          <span>Reportes</span>
        </button>
        <button
          className={`nav-item ${currentPage === 'usuarios' ? 'active' : ''}`}
          onClick={() => onNavigate('usuarios')}
        >
          <span className="nav-icon"><Users size={20} /></span>
          <span>Usuarios</span>
        </button>
        <button
          className={`nav-item ${currentPage === 'ajustes' ? 'active' : ''}`}
          onClick={() => onNavigate('ajustes')}
        >
          <span className="nav-icon"><Settings size={20} /></span>
          <span>Ajustes</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            <span>U1</span>
          </div>
          <div className="user-info">
            <span className="user-name">Usuario1</span>
            <span className="user-role">Admin</span>
          </div>
          <Settings size={18} className="user-settings-icon" />
        </div>
      </div>
    </aside>
  );
}
