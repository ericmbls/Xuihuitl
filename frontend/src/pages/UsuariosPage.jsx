import { useState } from 'react';
import {
  Trash2, Mail, Users, Ticket, UserCheck, Search, Plus,
  Shield, Edit3, MoreVertical, Lock, Unlock
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './UsuariosPage.css';

export default function UsuariosPage({ onNavigate, currentPage }) {
  const [searchTerm, setSearchTerm] = useState('');

  // KPIs Data
  const stats = [
    { title: 'Total de usuarios', value: '5', icon: <Users size={20} />, color: '#F3F4F6' },
    { title: 'Activos ahora', value: '4', icon: <UserCheck size={20} />, color: '#F3F4F6' },
    { title: 'Administradores', value: '1', icon: <Shield size={20} />, color: '#F3F4F6' },
    { title: 'Invitaciones', value: '2', icon: <Mail size={20} />, color: '#F3F4F6' },
  ];

  // Roles Data
  const rolesInfo = [
    { title: 'Administrador', count: '1 Usuario', desc: 'Acceso completo a todos los módulos y configuraciones', color: '#FEF3C7' },
    { title: 'Agrónomo', count: '2 Usuarios', desc: 'Gestión de cultivos, sensores y análisis', color: '#FFF7ED' },
    { title: 'Operador', count: '2 Usuarios', desc: 'Visualización y operaciones básicas', color: '#FFFbea' },
  ];

  const users = [
    { id: 1, name: 'javier.ortiz@yahoo.com', contact: '(714) 854-0129', role: 'Administrador', modules: '6 módulos', lastActive: 'Hace 5 min', status: 'Activo' },
    { id: 2, name: 'javiersanchez@hotmail.com', contact: '(214) 609-8702', role: 'Agrónomo', modules: '4 módulos', lastActive: 'Hace 15 min', status: 'Activo' },
    { id: 3, name: 'real.danieljackson@hotmail.com', contact: '(919) 966-6855', role: 'Operador', modules: '3 módulos', lastActive: 'Hace 1 hora', status: 'Activo' },
    { id: 4, name: 'matthewjackson85@hotmail.com', contact: '(310) 714-9922', role: 'Agrónomo', modules: '3 módulos', lastActive: 'Hace 2 días', status: 'Activo' },
    { id: 5, name: 'real.sarahjohnson@yahoo.com', contact: '(815) 652-0481', role: 'Operador', modules: '2 módulos', lastActive: 'Hace 5 min', status: 'Inactivo' },
  ];

  const getInitials = (email) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="dashboard-layout">
      <Sidebar onNavigate={onNavigate} currentPage={currentPage} />
      <div className="dashboard-main">
        <Header onAddCultivo={() => { }} title="Usuarios" />

        <div className="dashboard-content">
          {/* Header Row */}
          <div className="page-header-row">
            <div>
              <h1 className="page-title">Gestión de Usuarios</h1>
              <p className="page-subtitle">Administrar usuarios, roles y permisos</p>
            </div>
            <button className="btn-primary-brown">
              <Plus size={18} style={{ marginRight: 8 }} /> Nuevo Usuario
            </button>
          </div>

          {/* Stats Row */}
          <div className="stats-row">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-content">
                  <span className="stat-title">{stat.title}</span>
                  <h2 className="stat-value">{stat.value}</h2>
                </div>
                <div className="stat-icon">{stat.icon}</div>
              </div>
            ))}
          </div>

          {/* Roles Info Row */}
          <div className="roles-info-row">
            <h3>Roles y Permisos</h3>
            <div className="roles-cards-grid">
              {rolesInfo.map((role, index) => (
                <div key={index} className="role-info-card" style={{ background: role.color }}>
                  <div className="role-card-header">
                    <Shield size={20} className="role-icon-card" />
                    <span className="role-count-badge">{role.count}</span>
                  </div>
                  <h4>{role.title}</h4>
                  <p>{role.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-bar-row">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon-input" />
              <input
                type="text"
                placeholder="Buscar usuarios por nombre, email o rol"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="users-table-container">
            <table className="users-table-custom">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Contacto</th>
                  <th>Rol</th>
                  <th>Módulos</th>
                  <th>Última Actividad</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-cell-profile">
                        <div className="user-avatar-small" style={{
                          background: '#8B6F47',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          marginRight: '12px'
                        }}>
                          {getInitials(user.name)}
                        </div>
                        <span className="user-email-text">{user.name}</span>
                      </div>
                    </td>
                    <td>{user.contact}</td>
                    <td>
                      <span className={`role-pill ${user.role.toLowerCase()}`}>{user.role}</span>
                    </td>
                    <td><span className="modules-pill">{user.modules}</span></td>
                    <td>{user.lastActive}</td>
                    <td>
                      <div className="status-cell">
                        {user.status === 'Activo' ? <Unlock size={14} /> : <Lock size={14} />}
                        <span>{user.status}</span>
                      </div>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button className="icon-btn-ghost"><Edit3 size={16} /></button>
                        <button className="icon-btn-ghost"><Trash2 size={16} /></button>
                        <button className="icon-btn-ghost"><MoreVertical size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Invitaciones Pendientes Section */}
          <div className="invites-section">
            <div className="invite-content-left">
              <div className="invite-icon-box">
                <Mail size={24} color="#8B6F47" />
              </div>
              <div className="invite-texts">
                <h4>Invitaciones Pendientes</h4>
                <p>2 invitaciones están pendientes de aceptación: pedro.sanchez@xihuitl.com, Lucia.ramirez@gmail.com</p>
              </div>
            </div>
            <button className="btn-secondary-brown">
              <UserCheck size={16} style={{ marginRight: 8 }} /> Ver Detalles
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
