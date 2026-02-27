import './SurcoCard.css';

export default function SurcoCard({ image, name, selectedOption, cultivarId, soilHealth }) {
  return (
    <div className="surco-card">
      <img src={image} alt={name} className="surco-image" />
      <div className="surco-content">
        <div className="surco-badges">
          <span className="badge badge-brown">{name}</span>
          <span className="badge badge-outline">{selectedOption}</span>
        </div>
        <div className="surco-meta">
          <span className="badge badge-meta">Cultivar: {cultivarId}</span>
        </div>
      </div>
    </div>
  );
}
