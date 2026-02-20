import React from 'react';

export default function Toasts({ toasts, removeToast }) {
  return (
    <div className="toasts-root" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <div className="toast-content">
            <div className="toast-message">{t.message}</div>
            <button className="toast-close" onClick={() => removeToast(t.id)} aria-label="Cerrar">×</button>
          </div>
        </div>
      ))}
    </div>
  );
}
