import { Search, Plus } from 'lucide-react';
import './Header.css';

export default function Header({ onAddCultivo, onLogout, title }) {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <div className="header-search">
          <input
            type="text"
            placeholder="Buscar contenido"
            className="search-input"
          />
          <span className="search-icon"><Search size={18} /></span>
        </div>
        {title && <h2 className="header-title">{title}</h2>}
      </div>
      <div className="header-actions">
        <button className="btn-add-cultivo" onClick={onAddCultivo}>
          <span><Plus size={18} /></span>
          Añadir cultivo
        </button>
        {onLogout && (
          <button className="btn-logout" onClick={onLogout}>
            Cerrar Sesión
          </button>
        )}
      </div>
    </header>
  );
}
