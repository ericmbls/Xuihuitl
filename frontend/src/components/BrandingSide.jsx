import logo from '../assets/logo.png';
import './BrandingSide.css';

export default function BrandingSide() {
  return (
    <div className="branding-side">
      <div className="branding-content">
        <div className="flower-logo">
          <img src={logo} alt="Xihuitl Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>

        <h1 className="brand-name">Xihuitl</h1>
      </div>
    </div>
  );
}
