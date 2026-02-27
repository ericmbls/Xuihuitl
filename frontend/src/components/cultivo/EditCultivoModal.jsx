import './EditCultivoModal.css';

export default function EditCultivoModal({ isOpen, onClose, cultivo }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h2>{cultivo?.name || 'Editar cultivo'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="cultivo-details">
            <div className="cultivo-image">
              <div className="image-container">
                <img 
                  src={cultivo?.image || 'https://via.placeholder.com/200'} 
                  alt={cultivo?.name} 
                />
              </div>
              <button className="btn-edit-image">📝 Editar</button>
            </div>

            <div className="info-section">
              <h3>Información del cultivo</h3>
              <div className="info-badges">
                <div className="info-item">
                  <label>Fecha de siembrado</label>
                  <span className="badge-info">
                    {cultivo?.fechaSiembrado || '31/01/2026'}
                  </span>
                </div>

                <div className="info-item">
                  <label>Frecuencia de riego</label>
                  <span className="badge-info">
                    2 - 3 veces por semana
                  </span>
                </div>

                <div className="info-item">
                  <label>Cantidad de riego</label>
                  <span className="badge-info">
                    15 - 20 cm de suelo
                  </span>
                </div>

                <div className="info-item">
                  <label>Estado del cultivo</label>
                  <span className="badge-info">
                    Saludable
                  </span>
                </div>

                <div className="info-item">
                  <label>Estado del suelo</label>
                  <span className="badge-info">
                    Óptimo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-guardar">
            Guardar cambios
          </button>
        </div>

      </div>
    </div>
  );
}