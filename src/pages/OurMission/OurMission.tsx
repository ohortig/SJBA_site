import { ConstructionNotice } from '@components';
import './OurMission.css';

export const OurMission = () => {
  return (
    <div className="page-container">
      <div className="mission-header">
        <h1 className="mission-title">Our Mission</h1>
      </div>

      <ConstructionNotice />
    </div>
  );
};
