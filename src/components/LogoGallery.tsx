import './LogoGallery.css';

interface Logo {
  name: string;
  src: string;
  hasImage: boolean;
}

const LogoGallery = () => {
  const logos: Logo[] = [
    { name: 'Goldman Sachs', src: '/logos/goldman_sachs_logo.png', hasImage: true },
    { name: 'JPMorgan Chase', src: '/logos/jpmorgan_logo.jpg', hasImage: true },
    { name: 'Morgan Stanley', src: '/logos/morgan_stanley_logo.jpg', hasImage: true },
    { name: 'Blackstone', src: '/logos/blackstone_logo.png', hasImage: true },
    { name: 'Sequoia Capital', src: '/logos/sequoia_logo.png', hasImage: true },
    { name: 'McKinsey & Company', src: '/logos/mckinsey_logo.jpg', hasImage: true },
    { name: 'Ackman-Ziff', src: '/logos/ackman_ziff_logo.jpg', hasImage: true },
    { name: 'Axom Partners', src: '/logos/axom_partners_logo.jpg', hasImage: true },
    { name: 'Bank of America', src: '/logos/bank_of_america_logo.png', hasImage: true },
    { name: 'Carter Pierce', src: '/logos/carter_pierce_logo.png', hasImage: true },
    { name: 'Cushman & Wakefield', src: '/logos/cushman_and_wakefield_logo.png', hasImage: true },
    { name: 'Declaration Partners', src: '/logos/declaration_partners_logo.jpg', hasImage: true },
    { name: 'Deutsche Bank', src: '/logos/deutsche_bank_logo.png', hasImage: true },
    { name: 'Eden Global Partners', src: '/logos/eden_global_partners_logo.jpeg', hasImage: true },
    { name: 'FTI Consulting', src: '/logos/FTI_consulting_logo.png', hasImage: true },
    { name: 'HSBC', src: '/logos/HSBC_logo.png', hasImage: true },
    { name: 'IBM', src: '/logos/IBM_logo.png', hasImage: true },
    { name: 'KKR', src: '/logos/KKR_logo.png', hasImage: true },
    { name: 'Logos Capital', src: '/logos/logos_capital_logo.png', hasImage: true },
    { name: 'Palantir', src: '/logos/palantir.png', hasImage: true },
    { name: 'UBS', src: '/logos/UBS_logo.png', hasImage: true }
  ];

  return (
    <div className="logo-gallery-container">
      <div className="logo-gallery">
        {/* First set of logos */}
        {logos.map((logo, index) => (
          <div key={`set1-${index}`} className="logo-item">
            {logo.hasImage ? (
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
              <span className="logo-text">
                {logo.name}
              </span>
            )}
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {logos.map((logo, index) => (
          <div key={`set2-${index}`} className="logo-item">
            {logo.hasImage ? (
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
              <span className="logo-text">
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoGallery; 