import { useState } from 'react';
import Header from '../components/Header';
import EditCultivoModal from '../components/EditCultivoModal';
import './CultivosPage.css';

export default function CultivosPage({ onNavigate, currentPage, onLogout }) {
  const [selectedCultivo, setSelectedCultivo] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const surcos = [
    {
      id: 1,
      nombre: 'Surco A',
      cultivos: [
        {
          id: 1,
          name: 'Betabel',
          image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=200&fit=crop',
          surco: 'Surco A',
          source: 'Fuente A',
        },
        {
          id: 2,
          name: 'Zanahoria',
          image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b11?w=300&h=200&fit=crop',
          surco: 'Surco A',
          source: 'Fuente A',
        },
        {
          id: 3,
          name: 'Lechuga',
          image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b11?w=300&h=200&fit=crop',
          surco: 'Surco A',
          source: 'Fuente A',
        },
        {
          id: 4,
          name: 'Espinaca',
          image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b11?w=300&h=200&fit=crop',
          surco: 'Surco A',
          source: 'Fuente A',
        },
      ],
    },
    {
      id: 2,
      nombre: 'Surco B',
      cultivos: [
        {
          id: 5,
          name: 'Tomate',
          image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=300&h=200&fit=crop',
          surco: 'Surco B',
          source: 'Fuente B',
        },
        {
          id: 6,
          name: 'Tomate',
          image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=300&h=200&fit=crop',
          surco: 'Surco B',
          source: 'Fuente B',
        },
        {
          id: 7,
          name: 'Tomate',
          image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=300&h=200&fit=crop',
          surco: 'Surco B',
          source: 'Fuente B',
        },
        {
          id: 8,
          name: 'Tomate',
          image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=300&h=200&fit=crop',
          surco: 'Surco B',
          source: 'Fuente B',
        },
      ],
    },
    {
      id: 3,
      nombre: 'Surco C',
      cultivos: [
        {
          id: 9,
          name: 'Tomatillo verde',
          image: 'https://images.unsplash.com/photo-1464922713794-2ad667be5744?w=300&h=200&fit=crop',
          surco: 'Surco C',
          source: 'Fuente C',
        },
        {
          id: 10,
          name: 'Tomatillo verde',
          image: 'https://images.unsplash.com/photo-1464922713794-2ad667be5744?w=300&h=200&fit=crop',
          surco: 'Surco C',
          source: 'Fuente C',
        },
        {
          id: 11,
          name: 'Tomatillo verde',
          image: 'https://images.unsplash.com/photo-1464922713794-2ad667be5744?w=300&h=200&fit=crop',
          surco: 'Surco C',
          source: 'Fuente C',
        },
        {
          id: 12,
          name: 'Tomatillo verde',
          image: 'https://images.unsplash.com/photo-1464922713794-2ad667be5744?w=300&h=200&fit=crop',
          surco: 'Surco C',
          source: 'Fuente C',
        },
      ],
    },
  ];

  const handleEditCultivo = (cultivo) => {
    setSelectedCultivo(cultivo);
    setShowEditModal(true);
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-main">
        <Header onAddCultivo={() => {}} onLogout={onLogout} />
        <div className="cultivos-content">
          {surcos.map((surco) => (
            <section key={surco.id} className="surco-section">
              <h2>{surco.nombre}</h2>
              <div className="cultivos-grid">
                {surco.cultivos.map((cultivo) => (
                  <div
                    key={cultivo.id}
                    className="cultivo-card-large"
                    onClick={() => handleEditCultivo(cultivo)}
                  >
                    <img src={cultivo.image} alt={cultivo.name} />
                    <div className="cultivo-card-content">
                      <span className="badge badge-cultivo">{cultivo.name}</span>
                      <span className="badge badge-source">{cultivo.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <EditCultivoModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        cultivo={selectedCultivo}
      />
    </div>
  );
}
