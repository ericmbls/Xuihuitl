import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CultivosPage from './pages/CultivosPage';
import ReportesPage from './pages/ReportesPage';
import UsuariosPage from './pages/UsuariosPage';
import AjustesPage from './pages/AjustesPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userRole] = useState('admin');

  const pages = {
    dashboard: DashboardPage,
    cultivos: CultivosPage,
    reportes: ReportesPage,
    usuarios: UsuariosPage,
    ajustes: AjustesPage,
  };

  const headerConfig = {
    dashboard: { title: 'Dashboard', showButton: false },
    cultivos: { title: 'Cultivos', showButton: true },
    reportes: { title: 'Reportes', showButton: false },
    usuarios: { title: 'Usuarios', showButton: false },
    ajustes: { title: 'Ajustes', showButton: false },
  };

  const CurrentPageComponent = pages[currentPage];
  const currentHeader = headerConfig[currentPage];

  if (!isLoggedIn) {
    return <LoginPage setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div className="app-layout">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        role={userRole}
      />

      <main className="main-layout">
        <Header
          title={currentHeader.title}
          showButton={currentHeader.showButton}
        />
        <CurrentPageComponent />
      </main>
    </div>
  );
}

export default App;