import { Footer, LogoGallery, CallToAction, type Logo } from '@components';
import { useScrollAnimation } from '@hooks';
import './OurMission.css';

export const OurMission = () => {
  const headerAnimation = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px',
  });

  const zigzag1Animation = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const zigzag2Animation = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const zigzag3Animation = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const zigzag4Animation = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const membersAnimation = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const missionPart1 = `The Stern Jewish Business Association is one of the most active and substantive student organizations at the NYU Stern School of Business, open to all who are supportive of the Jewish community and values, regardless of faith.`;

  const missionPart2 = `SJBA was founded in the wake of the October 7th massacre in Israel to combat the surge of antisemitism on campus. Since then, we have connected with industry leaders, intellectuals, and value creators to inspire students on campus.`;

  const missionPart3 = `Our goal is to bridge generations – allowing students to learn directly from those who have built, led, and given back, while creating a pipeline of future leaders equipped to do the same. Our community consists of hundreds of students across all schools within NYU.`;

  const missionPart4 = `Reflecting our strong focus on leadership and impact, our speaker series – SJBA Spotlight – has included Fortune 500 CEOs, partners at distinguished firms like Goldman Sachs and Blackstone, U.S. ambassadors, professional athletes, and notable entrepreneurs. Despite our large following, our conversations feel intimate and engaging. We want our members to hear from those who've stood where they stand now and know what it takes to go further.`;

  const alumniLogos: Logo[] = [
    { name: 'Capital One', src: '/alumni-logos/capital-one-logo.png' },
    { name: 'Deutsche Bank', src: '/alumni-logos/deutsche-bank-logo.png' },
    { name: 'FTI Consulting', src: '/alumni-logos/fti-consluting-logo.png' },
    { name: 'Goldman Sachs', src: '/alumni-logos/goldman-sachs-logo.png' },
    { name: 'JPMorgan Chase', src: '/alumni-logos/jpmorgan-logo.png' },
    { name: 'Lazard', src: '/alumni-logos/lazard-logo.svg' },
    { name: 'Lincoln International', src: '/alumni-logos/lincoln-international-logo.png' },
    { name: 'Morgan Stanley', src: '/alumni-logos/morgan-stanley-logo.jpg' },
    { name: 'Palantir', src: '/alumni-logos/palantir-logo.png' },
    { name: 'UBS', src: '/alumni-logos/ubs-logo.png' },
    { name: 'Wells Fargo', src: '/alumni-logos/wells-fargo-logo.png' },
  ];

  return (
    <>
      <div className="page-container">
        <div
          ref={headerAnimation.elementRef}
          className={`mission-header slide-up ${headerAnimation.isVisible ? 'visible' : ''}`}
        >
          <h1 className="mission-title">Our Mission</h1>
        </div>

        {/* Zigzag Section */}
        <div className="mission-zigzag">
          {/* Row 1: Text Left, Image Right */}
          <div
            ref={zigzag1Animation.elementRef}
            className={`zigzag-row ${zigzag1Animation.isVisible ? 'visible' : ''}`}
          >
            <div className="zigzag-text">
              <p>{missionPart1}</p>
            </div>
            <div className="zigzag-image">
              <img src="/mission-gallery/stern-building.jpg" alt="NYU Stern" />
            </div>
          </div>

          {/* Row 2: Image Left, Text Right */}
          <div
            ref={zigzag2Animation.elementRef}
            className={`zigzag-row zigzag-row-reverse ${zigzag2Animation.isVisible ? 'visible' : ''}`}
          >
            <div className="zigzag-text">
              <p>{missionPart2}</p>
            </div>
            <div className="zigzag-image">
              <img className="sjba-logo" src="/sjba/sjba-logo-purple.png" alt="SJBA Logo" />
            </div>
          </div>

          {/* Row 3: Text Left, Image Right */}
          <div
            ref={zigzag3Animation.elementRef}
            className={`zigzag-row ${zigzag3Animation.isVisible ? 'visible' : ''}`}
          >
            <div className="zigzag-text">
              <p>{missionPart3}</p>
            </div>
            <div className="zigzag-image">
              <img src="/mission-gallery/networking-blurb.png" alt="SJBA Networking" />
            </div>
          </div>

          {/* Row 4: Image Left, Text Right */}
          <div
            ref={zigzag4Animation.elementRef}
            className={`zigzag-row zigzag-row-reverse ${zigzag4Animation.isVisible ? 'visible' : ''}`}
          >
            <div className="zigzag-text">
              <p>{missionPart4}</p>
            </div>
            <div className="zigzag-image">
              <img src="/mission-gallery/speakers-blurb.png" alt="SJBA Speakers" />
            </div>
          </div>
        </div>

        {/* Where Our Members End Up Section */}
        <div
          ref={membersAnimation.elementRef}
          className={`members-section ${membersAnimation.isVisible ? 'visible' : ''}`}
        >
          <h2 className="members-title">Where Our Members End Up</h2>
          <div className="logo-galleries-wrapper">
            <LogoGallery direction="right" logos={alumniLogos} />
            <LogoGallery direction="left" logos={alumniLogos} />
          </div>
        </div>

        <CallToAction
          title="Join Our Community"
          bodyText="SJBA is open to all students who are supportive of the Jewish community and values. Connect with like-minded peers, attend our speaker series, and build meaningful relationships that last beyond graduation."
          primaryButtonText="Get Involved"
          primaryButtonHref="/contact"
          secondaryButtonText="Attend Our Events"
          secondaryButtonHref="/events"
        />
      </div>

      <Footer />
    </>
  );
};
