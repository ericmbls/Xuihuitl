import { Search, Plus } from 'lucide-react';
import './Header.css';

export default function Header({ title, showButton }) {
  return (
    <header className="dashboard-header">
      <div>
        <h2>{title}</h2>
      </div>

      <div className="header-search">
        <input
          type="text"
          placeholder="Buscar contenido"
          className="search-input"
        />
        <span className="search-icon">
          <Search size={18} />
        </span>
      </div>

      {showButton && (
        <button className="btn-add-cultivo">
          <span><Plus size={18} /></span>
          Añadir cultivo
        </button>
      )}
    </header>
  );
}