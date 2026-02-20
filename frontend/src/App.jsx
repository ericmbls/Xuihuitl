import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CultivosPage from './pages/CultivosPage';
import ReportesPage from './pages/ReportesPage';
import UsuariosPage from './pages/UsuariosPage';
import AjustesPage from './pages/AjustesPage';
import { NotificationProvider, useNotification } from './components/NotificationProvider';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { addToast } = useNotification();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    setIsLoggedIn(false);
    addToast('Sesión cerrada', 'info');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  if (!isLoggedIn) {
    return <LoginPage setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <>
      {currentPage === 'dashboard' && <DashboardPage onNavigate={handleNavigate} currentPage={currentPage} onLogout={handleLogout} />}
      {currentPage === 'cultivos' && <CultivosPage onNavigate={handleNavigate} currentPage={currentPage} onLogout={handleLogout} />}
      {currentPage === 'reportes' && <ReportesPage onNavigate={handleNavigate} currentPage={currentPage} onLogout={handleLogout} />}
      {currentPage === 'usuarios' && <UsuariosPage onNavigate={handleNavigate} currentPage={currentPage} onLogout={handleLogout} />}
      {currentPage === 'ajustes' && <AjustesPage onNavigate={handleNavigate} currentPage={currentPage} onLogout={handleLogout} />}
    </>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
}
