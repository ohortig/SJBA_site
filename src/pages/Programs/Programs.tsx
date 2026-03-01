import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Footer } from '@components';
import { useScrollAnimation } from '@hooks';
import { dataService } from '@api';
import type { BoardMember } from '@types';
import { MOTION_TRANSITION_FAST } from '../../motion/tokens';
import './Programs.css';

/* Default values for mentorship application status and URL (updated with API call) */
const DEFAULTS = {
  mentorship_application_open: 'false',
  mentorship_application_url: '',
};

export const Programs = () => {
  const shouldReduceMotion = useReducedMotion();
  const headerAnim = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
  const introAnim = useScrollAnimation({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  const zigzag1Anim = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  const zigzag2Anim = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  const stepsAnim = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  const applyAnim = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  const [mentorshipChair, setMentorshipChair] = useState<BoardMember | null>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [applicationUrl, setApplicationUrl] = useState('');
  const [configLoaded, setConfigLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [configResult, membersResult] = await Promise.allSettled([
        dataService.siteConfig.getByKeys([
          'mentorship_application_open',
          'mentorship_application_url',
        ]),
        dataService.boardMembers.getAll(),
      ]);

      // Process site config
      if (configResult.status === 'fulfilled') {
        const config = configResult.value;
        setIsApplicationOpen(
          (config.mentorship_application_open ?? DEFAULTS.mentorship_application_open) === 'true'
        );
        setApplicationUrl(config.mentorship_application_url ?? DEFAULTS.mentorship_application_url);
      } else {
        console.error('Failed to fetch site config:', configResult.reason);
        setIsApplicationOpen(DEFAULTS.mentorship_application_open === 'true');
        setApplicationUrl(DEFAULTS.mentorship_application_url);
      }
      setConfigLoaded(true);

      // Process mentorship chair
      if (membersResult.status === 'fulfilled') {
        const chair = membersResult.value.find((m) => m.position.toLowerCase().includes('mentor'));
        if (chair) setMentorshipChair(chair);
      } else {
        console.error('Failed to fetch mentorship chair:', membersResult.reason);
      }
    };

    void fetchData();
  }, []);

  const scrollToApply = () => {
    document.getElementById('apply-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="page-container">
        {/* ── Header ── */}
        <div
          ref={headerAnim.elementRef}
          className={`programs-header ${headerAnim.isVisible ? 'visible' : ''}`}
        >
          <h1 className="programs-title">Mentorship at SJBA</h1>
        </div>

        {/* ── Introduction ── */}
        <div
          ref={introAnim.elementRef}
          className={`programs-intro ${introAnim.isVisible ? 'visible' : ''}`}
        >
          <p>
            Participants in our mentorship programs foster lasting relationships, exchange career
            guidance, and strengthen the Jewish community at NYU Stern across class years and degree
            levels.
          </p>
        </div>

        {/* ── Application status pill (scrolls to CTA) ── */}
        {configLoaded && (
          <button
            type="button"
            className={`application-status-pill ${isApplicationOpen ? 'open' : 'closed'}`}
            onClick={scrollToApply}
          >
            <motion.span
              className={`status-dot ${isApplicationOpen ? 'open-dot' : 'closed-dot'}`}
              animate={
                isApplicationOpen && !shouldReduceMotion ? { opacity: [1, 0.4, 1] } : { opacity: 1 }
              }
              transition={
                isApplicationOpen && !shouldReduceMotion
                  ? { duration: 2, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }
                  : { duration: 0 }
              }
            />
            {isApplicationOpen ? 'Applications Open — Apply Below' : 'Applications Closed'}
          </button>
        )}

        <hr className="programs-divider" />

        {/* ── Zigzag Section ── */}
        <div className="programs-zigzag">
          {/* Row 1 — Graduate Mentors */}
          <div
            ref={zigzag1Anim.elementRef}
            className={`programs-zigzag-row ${zigzag1Anim.isVisible ? 'visible' : ''}`}
          >
            <div className="programs-zigzag-text">
              <h3>Undergraduate & Graduate Pairings</h3>
              <p>
                In partnership with the Jewish Student Association (JSA), undergraduate students are
                paired with MBA and JD mentors, creating opportunities to learn directly from those
                with advanced academic and professional experience.
              </p>
            </div>
            <div className="programs-zigzag-image">
              <img
                src="/mentorship-gallery/mentorship-gallery-1.jpeg"
                alt="Graduate mentorship pairing"
              />
            </div>
          </div>

          {/* Row 2 — Peer Mentors */}
          <div
            ref={zigzag2Anim.elementRef}
            className={`programs-zigzag-row reverse ${zigzag2Anim.isVisible ? 'visible' : ''}`}
          >
            <div className="programs-zigzag-text">
              <h3>Underclassmen & Upperclassmen</h3>
              <p>
                Guidance is available at every stage of the undergraduate journey. Freshmen are
                matched with sophomores, and sophomores with juniors or seniors – ensuring that
                every student has a peer who recently navigated the same challenges and can offer
                first-hand advice.
              </p>
            </div>
            <div className="programs-zigzag-image">
              <img
                src="/mentorship-gallery/mentorship-gallery-2.jpeg"
                alt="Undergraduate mentorship pairing"
              />
            </div>
          </div>
        </div>

        {/* ── How It Works ── */}
        <div
          ref={stepsAnim.elementRef}
          className={`programs-steps-section ${stepsAnim.isVisible ? 'visible' : ''}`}
        >
          <h2 className="programs-steps-heading">How It Works</h2>

          <div className="programs-steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h4>Apply</h4>
              <p>
                Fill out the application form where you'll select which program(s) you're interested
                in and share your background, interests, and goals.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h4>Interview</h4>
              <p>
                Participate in a brief interview. Interview time slots are sent out after the
                application window closes.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h4>Get Matched</h4>
              <p>Pairs are matched thoughtfully to maximize value for both mentors and mentees.</p>
            </div>
          </div>
        </div>

        {/* ── Application CTA ── */}
        <div
          id="apply-section"
          ref={applyAnim.elementRef}
          className={`programs-apply-section ${applyAnim.isVisible ? 'visible' : ''}`}
        >
          <div className={`application-status-badge ${isApplicationOpen ? 'open' : 'closed'}`}>
            <motion.span
              className={`status-dot ${isApplicationOpen ? 'open-dot' : 'closed-dot'}`}
              animate={
                isApplicationOpen && !shouldReduceMotion ? { opacity: [1, 0.4, 1] } : { opacity: 1 }
              }
              transition={
                isApplicationOpen && !shouldReduceMotion
                  ? { duration: 2, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }
                  : { duration: 0 }
              }
            />
            {isApplicationOpen ? 'Applications Open' : 'Applications Closed'}
          </div>

          <h2 className="programs-apply-heading">
            {isApplicationOpen ? 'Ready to find your mentor?' : 'Applications are currently closed'}
          </h2>

          <p className="programs-apply-description">
            {isApplicationOpen
              ? 'Complete the application form to get started. Interview slots will be shared after the application window closes.'
              : 'Check back soon — we open applications at the start of each semester. Sign up for our newsletter to stay updated.'}
          </p>

          {isApplicationOpen ? (
            <motion.a
              href={applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="apply-button"
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
              transition={shouldReduceMotion ? { duration: 0 } : MOTION_TRANSITION_FAST}
            >
              Apply Now{' '}
              <motion.img
                src="/icons/arrow-top-right.png"
                alt="Arrow"
                className="apply-button-arrow"
                whileHover={shouldReduceMotion ? undefined : { x: 2, y: -2 }}
                transition={shouldReduceMotion ? { duration: 0 } : MOTION_TRANSITION_FAST}
              />
            </motion.a>
          ) : (
            <motion.span
              className="apply-button disabled"
              initial={false}
              animate={{ opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : MOTION_TRANSITION_FAST}
            >
              Applications Closed
            </motion.span>
          )}

          {mentorshipChair && (
            <div className="apply-contact-line">
              <span>
                Have any questions? Reach out to{' '}
                <a href={`mailto:${mentorshipChair.email}`}>{mentorshipChair.fullName}</a>,{' '}
                {mentorshipChair.position}
              </span>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};
