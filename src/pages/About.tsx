import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page-container">
      <div className="about-content">
        <div className="about-header">
          <h1 className="board-title">About SJBA</h1>
        </div>
        
        <div className="about-tiles">
          <Link to="/our-mission" className="about-tile">
            <div className="tile-icon">
              <span>🎯</span>
            </div>
            <div className="tile-content">
              <h3 className="tile-title">Our Mission</h3>
              <p className="tile-description">Learn about our purpose and values</p>
              <div className="tile-hint">Click to explore</div>
            </div>
          </Link>
          
          <Link to="/our-board" className="about-tile">
            <div className="tile-icon">
              <span>👥</span>
            </div>
            <div className="tile-content">
              <h3 className="tile-title">Our Board</h3>
              <p className="tile-description">Meet our dedicated leadership team</p>
              <div className="tile-hint">Click to explore</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About; 