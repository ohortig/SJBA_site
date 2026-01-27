import './OurMission.css';

export const OurMission = () => {
  return (
    <div className="page-container">
      <div className="mission-header">
        <h1 className="mission-title">Our Mission</h1>
      </div>

      <div className="construction-container">
        <h2>This page is currently under construction. Stay tuned for updates.</h2>
        <div className="construction-buttons">
          <a href="/contact" className="construction-btn">
            Get Involved
          </a>
        </div>
      </div>
    </div>
  );
};
