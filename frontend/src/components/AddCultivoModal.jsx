import { Upload, X, ChevronDown } from 'lucide-react';
import './AddCultivoModal.css';

export default function AddCultivoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}><X size={24} /></button>

        <div className="modal-body">
          {/* Columna Izquierda: Imagen */}
          <div className="left-column">
            <div className="image-upload-area">
              <Upload className="upload-icon" size={32} strokeWidth={1.5} />
              <span className="upload-text">Subir imagen</span>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="right-column">
            {/* Título opcional, si no está en el diseño se puede quitar o hacer muy sutil */}
            {/* <h2>Nuevo Cultivo</h2> */}

            <div className="form-group">
              <label>Nombre</label>
              <input type="text" className="input-flushed" />
            </div>

            <div className="form-group">
              <label>Ubicación</label>
              <div className="select-wrapper">
                <select className="input-flushed">
                  <option>Seleccionar invernadero</option>
                  <option>Invernadero A</option>
                  <option>Invernadero B</option>
                  <option>Campo Abierto</option>
                </select>
                <ChevronDown className="select-arrow" size={16} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Plantado</label>
                <input type="date" className="input-flushed" />
              </div>
              <div className="form-group">
                <label>Área</label>
                <input type="text" className="input-flushed" placeholder="m²" />
              </div>
            </div>

            <div className="form-group">
              <label>Cosecha estimada</label>
              <input type="text" className="input-flushed" placeholder="--/--/----" />
            </div>

            <div className="form-group">
              <textarea
                className="textarea-bordered"
                placeholder="Describe el cultivo sembrado"
              ></textarea>
            </div>

            <div className="modal-actions">
              <button className="btn-save" onClick={onClose}>Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
