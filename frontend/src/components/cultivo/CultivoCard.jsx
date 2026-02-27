import './CultivoCard.css';

export default function CultivoCard({ image, name, surco, source }) {
  return (
    <div className="cultivo-card">
      <img src={image} alt={name} className="cultivo-image" />
      <div className="cultivo-content">
        <span className="badge badge-cultivo">{name}</span>
        <span className="badge badge-source">{source}</span>
      </div>
    </div>
  );
}
