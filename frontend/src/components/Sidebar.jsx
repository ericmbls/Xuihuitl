import { LayoutDashboard, Sprout, BarChart3, Users, Settings } from 'lucide-react';
import logo from '../assets/logo.png';
import './Sidebar.css';

export default function Sidebar({ currentPage, onNavigate, role = 'admin' }) {

  const menu = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'cultivos', label: 'Cultivos', icon: <Sprout size={20} /> },
    { id: 'reportes', label: 'Reportes', icon: <BarChart3 size={20} /> },
  ];

  if (role === 'admin') {
    menu.push({ id: 'usuarios', label: 'Usuarios', icon: <Users size={20} /> });
  }

  menu.push({ id: 'ajustes', label: 'Ajustes', icon: <Settings size={20} /> });

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Xihuitl" className="sidebar-logo" />
        <h1>Xihuitl</h1>
      </div>

      <nav className="sidebar-nav">
        {menu.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-avatar">U1</div>
        <div className="user-meta">
          <span className="user-name">Usuario1</span>
          <span className="user-role">Administrador</span>
        </div>
      </div>
    </aside>
  );
}