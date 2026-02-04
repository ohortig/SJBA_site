import './LogoGallery.css';

export interface Logo {
  name: string;
  src: string;
  hasImage?: boolean;
}

interface LogoGalleryProps {
  direction?: 'left' | 'right';
  logos: Logo[];
}

export const LogoGallery = ({ direction = 'left', logos }: LogoGalleryProps) => {
  return (
    <div className="logo-gallery-container">
      <div className={`logo-gallery ${direction === 'right' ? 'logo-gallery-right' : ''}`}>
        {/* First set of logos */}
        {logos.map((logo, index) => (
          <div key={`set1-${index}`} className="logo-item">
            {logo.hasImage !== false ? (
              <>
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="company-logo"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    const target = e.currentTarget;
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      target.style.display = 'none';
                      fallback.style.display = 'block';
                    }
                  }}
                />
                <span className="logo-fallback" style={{ display: 'none' }}>
                  {logo.name}
                </span>
              </>
            ) : (
              <span className="logo-text">{logo.name}</span>
            )}
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {logos.map((logo, index) => (
          <div key={`set2-${index}`} className="logo-item">
            {logo.hasImage !== false ? (
              <>
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="company-logo"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      target.style.display = 'none';
                      fallback.style.display = 'block';
                    }
                  }}
                />
                <span className="logo-fallback" style={{ display: 'none' }}>
                  {logo.name}
                </span>
              </>
            ) : (
              <span className="logo-text">{logo.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
