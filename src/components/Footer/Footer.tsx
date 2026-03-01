import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@hooks';
import { SocialLink } from '@components';
import { STATUS_PAGE_URL } from '@constants';
import { MOTION_EASE_STANDARD, MOTION_TRANSITION_FAST } from '../../motion/tokens';
import './Footer.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Footer = () => {
  const footerAnimation = useScrollAnimation({ threshold: 0.02 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.footer
      ref={footerAnimation.elementRef}
      className="footer-section"
      initial={{ opacity: 0 }}
      animate={footerAnimation.isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : MOTION_TRANSITION_FAST}
    >
      <div className="footer-content">
        <motion.div
          className="footer-links"
          variants={containerVariants}
          initial="hidden"
          animate={footerAnimation.isVisible ? 'visible' : 'hidden'}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: 0.2,
                  ease: MOTION_EASE_STANDARD,
                }
          }
        >
          <motion.div className="footer-column" variants={itemVariants}>
            <h3>Programs</h3>
            <Link to="/programs">All Programs</Link>
          </motion.div>

          <motion.div className="footer-column" variants={itemVariants}>
            <h3>Events</h3>
            <Link to="/events">Events & Speakers</Link>
          </motion.div>

          <motion.div className="footer-column" variants={itemVariants}>
            <h3>About Us</h3>
            <Link to="/our-mission">Our Mission</Link>
            <Link to="/our-board">Our Board</Link>
            <Link to="/our-members">Our Members</Link>
          </motion.div>

          <motion.div className="footer-column" variants={itemVariants}>
            <h3>Connect</h3>
            <Link to="/contact">Contact Us</Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="footer-social"
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 40 }}
          animate={footerAnimation.isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={shouldReduceMotion ? { duration: 0 } : MOTION_TRANSITION_FAST}
        >
          <h3>Where to find us</h3>
          <div className="social-links">
            <SocialLink
              href="https://www.linkedin.com/company/sjba/"
              platform="linkedin"
              name="LinkedIn"
              handle="@sjba"
              iconSrc="/icons/linkedin-logo.png"
              alt="LinkedIn"
            />
            <SocialLink
              href="https://www.instagram.com/nyusjba/"
              platform="instagram"
              name="Instagram"
              handle="@nyusjba"
              iconSrc="/icons/instagram-logo.png"
              alt="Instagram"
            />
          </div>
        </motion.div>
      </div>

      <div className="footer-bottom">
        <div className="footer-address">
          <p>
            Stern Jewish Business Association
            <br />
            44 West 4th Street
            <br />
            New York, NY 10012 USA
          </p>
        </div>

        <div className="footer-copyright">
          <p>
            Copyright © {new Date().getFullYear()} Stern Jewish Business Association.
            <br />
            All rights reserved.
          </p>
          <motion.a
            className="footer-status-link"
            href={STATUS_PAGE_URL}
            target="_blank"
            rel="noreferrer"
            whileHover={shouldReduceMotion ? undefined : { opacity: 0.8 }}
            transition={shouldReduceMotion ? { duration: 0 } : MOTION_TRANSITION_FAST}
          >
            Service Status
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
};
