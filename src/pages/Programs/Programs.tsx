import { useEffect, useState } from 'react';
import {
  Footer,
  InlineLink,
  LinkButtonPrimary,
  LinkButtonSecondary,
  NumberedList,
  SubpageHero,
  ZigzagView,
} from '@components';
import { dataService } from '@api';
import { useScrollAnimation } from '@hooks';
import type { BoardMember } from '@types';
import './Programs.css';

const DEFAULTS = {
  mentorship_application_open: 'false',
  mentorship_application_url: '',
};

const MENTORSHIP_TRACKS = [
  {
    eyebrow: 'Cross-Campus Pairings',
    title: 'Undergraduate students are matched with MBA and JD mentors.',
    description:
      'In partnership with the Jewish Student Association, students build relationships with mentors who can speak to academic choices, recruiting timelines, and the transition into professional life.',
    image: '/mentorship-gallery/mentorship-gallery-1.jpeg',
    alt: 'Graduate mentorship pairing',
  },
  {
    eyebrow: 'Peer Guidance',
    title: 'Upperclassmen help newer students navigate Stern with recent experience.',
    description:
      'Freshmen are paired with sophomores, and sophomores with juniors or seniors, so every mentee has access to practical advice from someone who has recently navigated the same questions.',
    image: '/mentorship-gallery/mentorship-gallery-2.jpeg',
    alt: 'Undergraduate mentorship pairing',
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Apply',
    description:
      "Share which mentorship track fits you, along with your background, interests, and what you'd like from the relationship.",
  },
  {
    number: '02',
    title: 'Interview',
    description:
      'After applications close, mentorship leads send interview slots to understand fit, goals, and scheduling preferences.',
  },
  {
    number: '03',
    title: 'Match',
    description:
      'Pairs are finalized carefully so both sides enter the program with shared expectations and meaningful overlap.',
  },
];

export const Programs = () => {
  const heroAnim = useScrollAnimation({ threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
  const overviewAnim = useScrollAnimation({ threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  const tracksAnim = useScrollAnimation({ threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
  const processAnim = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
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

      if (membersResult.status === 'fulfilled') {
        const chair = membersResult.value.find((member) =>
          member.position.toLowerCase().includes('mentor')
        );
        if (chair) {
          setMentorshipChair(chair);
        }
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
      <div className="page-container mentorship-page">
        <SubpageHero
          ref={heroAnim.elementRef}
          visible={heroAnim.isVisible}
          backgroundImageSrc="/mentorship-gallery/mentorship-gallery-1.jpeg"
          eyebrow="Programs / Mentorship"
          title="Mentorship"
          lead="A structured way for SJBA members to learn across class years, degree programs, and career stages while building a stronger Jewish community at Stern."
          actions={
            <>
              {configLoaded ? (
                <LinkButtonSecondary
                  variant="status"
                  statusTone={isApplicationOpen ? 'open' : 'closed'}
                  showStatusDot
                  onClick={scrollToApply}
                >
                  {isApplicationOpen ? 'Application open' : 'Application closed'}
                </LinkButtonSecondary>
              ) : null}

              {isApplicationOpen ? (
                <LinkButtonPrimary
                  variant="subpage"
                  href={applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Application
                </LinkButtonPrimary>
              ) : (
                <LinkButtonPrimary variant="subpage" onClick={scrollToApply}>
                  View Application
                </LinkButtonPrimary>
              )}
            </>
          }
        />

        <section
          ref={overviewAnim.elementRef}
          className={`mentorship-overview ${overviewAnim.isVisible ? 'visible' : ''}`}
        >
          <div className="mentorship-overview-grid">
            <div className="mentorship-overview-intro">
              <span className="mentorship-section-label">Mentorship Program Overview</span>
              <h2>One program, two mentorship paths.</h2>
            </div>

            <div className="mentorship-overview-detail">
              <p className="mentorship-overview-lead">
                The mentorship program is designed to feel personal rather than administrative.
              </p>
              <div className="mentorship-overview-body">
                <p>
                  Students enter with clear goals, meet with SJBA leadership, and are paired with
                  mentors who can offer useful perspective on school life, recruiting, and
                  community.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ZigzagView
          ref={tracksAnim.elementRef}
          className="mentorship-tracks"
          visible={tracksAnim.isVisible}
          items={MENTORSHIP_TRACKS}
        />

        <section
          ref={processAnim.elementRef}
          className={`mentorship-process ${processAnim.isVisible ? 'visible' : ''}`}
        >
          <div className="mentorship-process-header">
            <span className="mentorship-section-label">How It Works</span>
            <h2>The matching process stays simple, deliberate, and consistent each semester.</h2>
          </div>

          <NumberedList items={PROCESS_STEPS} />
        </section>

        <section
          id="apply-section"
          ref={applyAnim.elementRef}
          className={`mentorship-apply ${applyAnim.isVisible ? 'visible' : ''}`}
        >
          <div className="mentorship-apply-copy">
            <span className="mentorship-section-label">Next Step</span>
            <h2>
              {isApplicationOpen ? (
                <>
                  <InlineLink href={applicationUrl} target="_blank" rel="noopener noreferrer">
                    Apply
                  </InlineLink>{' '}
                  to join the next mentorship cohort.
                </>
              ) : (
                'Applications are closed for the current cycle.'
              )}
            </h2>
            {mentorshipChair && (
              <p className="mentorship-contact mentorship-contact--intro">
                Questions can be directed to{' '}
                <a href={`mailto:${mentorshipChair.email}`}>{mentorshipChair.fullName}</a>,{' '}
                {mentorshipChair.position}.
              </p>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};
