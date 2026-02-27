import { useState } from "react";
import { Upload, X, ChevronDown } from "lucide-react";
import "./AddCultivoModal.css";

export default function AddCultivoModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nombre: "",
    ubicacion: "",
    fechaSiembra: "",
    descripcion: "",
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.nombre || !formData.fechaSiembra) return;

    const nuevoCultivo = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      ubicacion: formData.ubicacion || "Sin ubicación",
      fechaSiembra: new Date(formData.fechaSiembra).toISOString(),
      frecuenciaRiego: 2,
      estado: "activo", 
      userId: 1,
    };

    onSave(nuevoCultivo);

    setFormData({
      nombre: "",
      ubicacion: "",
      fechaSiembra: "",
      descripcion: "",
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-body">
          <div className="left-column">
            <div className="image-upload-area">
              <Upload size={32} strokeWidth={1.5} />
              <span>Subir imagen</span>
            </div>
          </div>

          <div className="right-column">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                className="input-flushed"
                value={formData.nombre}
                onChange={(e) =>
                  handleChange("nombre", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Ubicación</label>
              <div className="select-wrapper">
                <select
                  className="input-flushed"
                  value={formData.ubicacion}
                  onChange={(e) =>
                    handleChange("ubicacion", e.target.value)
                  }
                >
                  <option value="">Seleccionar invernadero</option>
                  <option value="Invernadero A">Invernadero A</option>
                  <option value="Invernadero B">Invernadero B</option>
                  <option value="Campo Abierto">Campo Abierto</option>
                </select>
                <ChevronDown size={16} className="select-arrow" />
              </div>
            </div>

            <div className="form-group">
              <label>Plantado</label>
              <input
                type="date"
                className="input-flushed"
                value={formData.fechaSiembra}
                onChange={(e) =>
                  handleChange("fechaSiembra", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <textarea
                className="textarea-bordered"
                placeholder="Describe el cultivo sembrado"
                value={formData.descripcion}
                onChange={(e) =>
                  handleChange("descripcion", e.target.value)
                }
              />
            </div>

            <div className="modal-actions">
              <button className="btn-save" onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}