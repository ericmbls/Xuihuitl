import { useState, useEffect } from 'react';
import LoginPage from './pages/Auth/LoginPage';
import DashboardPage from './pages/Dashboard/DashboardPage';     
import CultivosPage from './pages/Cultivos/CultivosPage';
import ReportesPage from './pages/Reportes/ReportesPage';        
import UsuariosPage from './pages/Usuarios/UsuariosPage';        
import AjustesPage from './pages/Ajustes/AjustesPage';           
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userRole] = useState('admin');
  const [darkMode, setDarkMode] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const pageConfig = {
    dashboard: { component: DashboardPage, title: 'Dashboard', showButton: false },
    cultivos: { component: CultivosPage, title: 'Cultivos', showButton: false },
    reportes: { component: ReportesPage, title: 'Reportes', showButton: false },
    usuarios: { component: UsuariosPage, title: 'Usuarios', showButton: false },
    ajustes: { component: AjustesPage, title: 'Ajustes', showButton: false },
  };

  if (!isLoggedIn) {
    return <LoginPage setIsLoggedIn={setIsLoggedIn} setToken={setToken} />;
  }

  const { component: CurrentPage, title, showButton } = pageConfig[currentPage];

  return (
    <div className="app-layout">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        role={userRole}
      />
      <main className="main-layout">
        <Header title={title} showButton={showButton} />
        <CurrentPage darkMode={darkMode} setDarkMode={setDarkMode} token={token} />
      </main>
    </div>
  );
}

export default App;