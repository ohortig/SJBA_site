import { useState, useEffect, useMemo, useCallback } from 'react';
import { Footer, LoadingSpinner, ErrorDisplay, CallToAction } from '@components';
import { semesterSortKey, semesterLabel } from '@utils';
import { useScrollAnimation } from '@hooks';
import { dataService } from '@api';
import type { Member } from '@types';
import './OurMembers.css';

export const OurMembers = () => {
  const headerAnimation = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px',
  });
  const infoAnimation = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const tableAnimation = useScrollAnimation({
    threshold: 0.05,
    rootMargin: '0px 0px 0px 0px',
  });

  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSemesterIndex, setActiveSemesterIndex] = useState(0);

  const fetchMembers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await dataService.members.getAll();
      setMembers(data);
    } catch (err) {
      console.error('Failed to fetch members:', err);
      let errorMessage = 'Failed to load members. Please try again later.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMembers();
  }, [fetchMembers]);

  // Group members by semester, sorted newest-first
  const groupedMembers = useMemo(() => {
    const map = new Map<string, Member[]>();
    for (const member of members) {
      const list = map.get(member.semester) ?? [];
      list.push(member);
      map.set(member.semester, list);
    }

    // Sort each group alphabetically by last name, then first name
    for (const list of map.values()) {
      list.sort((a, b) => {
        const last = a.lastName.localeCompare(b.lastName);
        return last !== 0 ? last : a.firstName.localeCompare(b.firstName);
      });
    }

    // Sort semesters newest-first
    const sorted = Array.from(map.entries()).sort(
      ([a], [b]) => semesterSortKey(b) - semesterSortKey(a)
    );

    // TEMPORARY HOLD: Do not show Spring 2026 members yet.
    // We need enough meetings this semester for students to truly be eligible
    // for membership before displaying this cohort. Remove this filter once
    // Spring 2026 membership eligibility has been finalized.
    const filtered = sorted.filter(([semester]) => semester !== 'S26');

    return filtered;
  }, [members]);

  const canGoPrev = activeSemesterIndex > 0;
  const canGoNext = activeSemesterIndex < groupedMembers.length - 1;
  const activeSemester = groupedMembers[activeSemesterIndex];

  return (
    <>
      <div className="page-container">
        <div className="members-page-content">
          {/* Header */}
          <div
            ref={headerAnimation.elementRef}
            className={`members-page-header slide-up ${headerAnimation.isVisible ? 'visible' : ''}`}
          >
            <h1 className="members-page-title">Our Members</h1>
            <p className="members-page-subtitle">
              While all SJBA events are open to every student, membership is awarded for consistent
              involvement.
            </p>
          </div>

          {/* Membership Policy Section */}
          <div
            ref={infoAnimation.elementRef}
            className={`members-policy-card slide-up ${infoAnimation.isVisible ? 'visible' : ''}`}
          >
            <div className="members-policy-accent" />
            <h2 className="members-policy-heading">Membership Policy</h2>
            <p className="members-policy-text">
              To qualify as an official SJBA member, students must attend:
            </p>
            <ul className="members-policy-list">
              <li>
                <strong>Five</strong> general meetings or speaker events for prospective members
              </li>
              <li>
                <strong>Four</strong> general meetings or speaker events for existing members
              </li>
            </ul>
            <p className="members-policy-text">
              Membership status allows the organization to secure funding while ensuring committed
              members receive priority access to resume reviews, mock interviews, and exclusive
              speaker programming.
            </p>
          </div>

          {/* Members Table Section */}
          <div
            ref={tableAnimation.elementRef}
            className={`members-table-section slide-up ${tableAnimation.isVisible ? 'visible' : ''}`}
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorDisplay error={error} onRetry={() => void fetchMembers()} />
            ) : groupedMembers.length === 0 ? (
              <p className="members-empty">No members to display yet.</p>
            ) : (
              <>
                {/* Table Context Header */}
                <div className="members-table-header">
                  <h2 className="members-table-heading">Recognized Members</h2>
                  <p className="members-table-subtitle">
                    The members listed below met the attendance requirements during their respective
                    semesters and earned official SJBA membership.
                  </p>
                </div>

                {/* Semester Navigation */}
                <div className="semester-nav">
                  <button
                    className="semester-arrow"
                    onClick={() => setActiveSemesterIndex((i) => i - 1)}
                    disabled={!canGoPrev}
                    aria-label="Previous semester"
                  >
                    ‹
                  </button>

                  <div className="semester-tabs">
                    {groupedMembers.map(([semester], index) => (
                      <button
                        key={semester}
                        className={`semester-tab ${index === activeSemesterIndex ? 'active' : ''}`}
                        onClick={() => setActiveSemesterIndex(index)}
                      >
                        {semesterLabel(semester)}
                      </button>
                    ))}
                  </div>

                  <button
                    className="semester-arrow"
                    onClick={() => setActiveSemesterIndex((i) => i + 1)}
                    disabled={!canGoNext}
                    aria-label="Next semester"
                  >
                    ›
                  </button>
                </div>

                {/* Active Semester Table */}
                {activeSemester && (
                  <div className="members-table-card">
                    <div className="members-table-wrapper">
                      <table className="members-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeSemester[1].map((member) => (
                            <tr key={member.id}>
                              <td className="member-name-cell">
                                {member.firstName} {member.lastName}
                              </td>
                              <td className="member-email-cell">
                                {member.email ? (
                                  <a href={`mailto:${member.email}`} className="member-email-link">
                                    {member.email}
                                  </a>
                                ) : (
                                  <span className="no-email">—</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="members-count">
                      {activeSemester[1].length} member{activeSemester[1].length !== 1 ? 's' : ''}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <CallToAction
          title="Want to become a member?"
          primaryButtonText="Browse Upcoming Events"
          primaryButtonHref="/events"
          secondaryButtonText="Contact Us"
          secondaryButtonHref="/contact"
        />
      </div>

      <Footer />
    </>
  );
};
