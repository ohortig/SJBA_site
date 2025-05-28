import React, { useState } from 'react';
import Footer from '../components/Footer';
import './OurBoard.css';

interface BoardMember {
  position: string;
  name: string;
  bio: string;
  detailedBio: string;
  major: string;
  year: string;
  hometown: string;
  interests: string;
  linkedin: string;
  email: string;
}

const OurBoard = () => {
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);

  const boardMembers = [
    {
      position: "Co-President",
      name: "Board Member Name",
      bio: "Leading SJBA with vision and dedication to building Jewish community at NYU Stern.",
      detailedBio: "As Co-President, this leader brings exceptional vision and dedication to building Jewish community at NYU Stern. With extensive experience in student leadership and a passion for fostering meaningful connections, they work tirelessly to ensure SJBA continues to thrive as a cornerstone of Jewish life at the business school. Their leadership style emphasizes collaboration, innovation, and creating opportunities for every member to grow both professionally and personally.",
      major: "Finance & Strategy",
      year: "Senior",
      hometown: "New York, NY",
      interests: "Investment Banking, Jewish History, Community Service",
      linkedin: "#",
      email: "member@stern.nyu.edu"
    },
    {
      position: "Co-President", 
      name: "Board Member Name",
      bio: "Co-leading SJBA's mission to develop future Jewish business leaders.",
      detailedBio: "Working alongside the other Co-President, this dynamic leader focuses on developing the next generation of Jewish business leaders. Their approach combines strategic thinking with genuine care for each member's journey. They have spearheaded numerous initiatives that bridge the gap between academic learning and real-world business applications, while ensuring that Jewish values remain at the heart of everything SJBA does.",
      major: "Finance & Marketing",
      year: "Senior",
      hometown: "Los Angeles, CA",
      interests: "Entrepreneurship, Marketing Strategy, Jewish Culture",
      linkedin: "#",
      email: "member@stern.nyu.edu"
    },
    {
      position: "Vice President",
      name: "Board Member Name", 
      bio: "Supporting executive leadership and coordinating cross-functional initiatives.",
      detailedBio: "The Vice President serves as a crucial bridge between executive leadership and the broader board, ensuring seamless coordination across all SJBA initiatives. With a keen eye for detail and exceptional organizational skills, they manage complex projects and help translate the organization's vision into actionable plans. Their collaborative approach has been instrumental in strengthening relationships both within SJBA and with external partners.",
      major: "Business Analytics",
      year: "Junior",
      hometown: "Chicago, IL",
      interests: "Data Analytics, Project Management, Jewish Community Building",
      linkedin: "#",
      email: "member@stern.nyu.edu"
    },
    {
      position: "Treasurer",
      name: "Board Member Name",
      bio: "Managing SJBA's financial operations and budget planning.",
      detailedBio: "As Treasurer, this detail-oriented leader oversees all financial aspects of SJBA, from budget planning to expense tracking and financial reporting. Their expertise in financial management ensures that every dollar is used effectively to maximize impact for members. They have implemented new financial systems that have improved transparency and efficiency, while also securing additional funding for key initiatives.",
      major: "Finance & Accounting",
      year: "Junior", 
      hometown: "Miami, FL",
      interests: "Corporate Finance, Financial Planning, Jewish Philanthropy",
      linkedin: "#",
      email: "member@stern.nyu.edu"
    },
    {
      position: "Director of Social Media & Marketing",
      name: "Board Member Name",
      bio: "Driving SJBA's digital presence and marketing strategy.",
      detailedBio: "Leading SJBA's digital transformation, this creative director has revolutionized how the organization connects with current and prospective members. Through innovative social media campaigns and strategic marketing initiatives, they have significantly increased SJBA's visibility and engagement. Their work has not only attracted new members but also strengthened the sense of community among existing ones.",
      major: "Marketing & Communications",
      year: "Sophomore",
      hometown: "Boston, MA",
      interests: "Digital Marketing, Content Creation, Jewish Media",
      linkedin: "#",
      email: "member@stern.nyu.edu"
    },
    {
      position: "Director of Communications",
      name: "Board Member Name",
      bio: "Managing internal and external communications for SJBA.",
      detailedBio: "Responsible for all internal and external communications, this director ensures that SJBA's message is clear, consistent, and compelling across all channels. They manage everything from weekly newsletters to major announcements, always maintaining the organization's professional voice while highlighting the warmth of the Jewish community. Their communication strategies have strengthened relationships with alumni, faculty, and partner organizations.",
      major: "Business Communications",
      year: "Junior",
      hometown: "Philadelphia, PA",
      interests: "Public Relations, Writing, Jewish Literature",
      linkedin: "#",
      email: "member@stern.nyu.edu"
    },
    {
      position: "Director of Alumni Relations & Speaker Events",
      name: "Board Member Name",
      bio: "Connecting current students with alumni and organizing speaker series.",
      detailedBio: "This director has built an extensive network connecting current SJBA members with successful alumni across various industries. They organize high-impact speaker events that provide invaluable insights into career paths and industry trends. Their efforts have resulted in numerous mentorship opportunities, internships, and job placements for SJBA members, creating a lasting bridge between past and present.",
      major: "Finance & Entrepreneurship",
      year: "Senior",
      hometown: "Washington, DC",
      interests: "Networking, Event Planning, Jewish Business History",
      linkedin: "#",
      email: "member@stern.nyu.edu"
    },
    {
      position: "Director of Outreach",
      name: "Board Member Name",
      bio: "Expanding SJBA's reach and building partnerships across NYU.",
      detailedBio: "Focused on expanding SJBA's influence and building meaningful partnerships across NYU and beyond, this director has successfully established collaborations with other student organizations, academic departments, and external Jewish organizations. Their outreach efforts have opened new opportunities for members and helped position SJBA as a leading voice in the broader Jewish student community.",
      major: "International Business",
      year: "Sophomore",
      hometown: "San Francisco, CA",
      interests: "Partnership Development, International Relations, Jewish Diaspora Studies",
      linkedin: "#",
      email: "member@stern.nyu.edu"
    },
    {
      position: "Director of Mentorship",
      name: "Board Member Name",
      bio: "Developing mentorship programs connecting students with industry professionals.",
      detailedBio: "This director has created comprehensive mentorship programs that pair SJBA members with industry professionals, alumni, and senior students. Their systematic approach to mentorship has resulted in meaningful, long-term relationships that extend far beyond graduation. They regularly organize mentorship events and provide resources to ensure both mentors and mentees get the most out of these valuable connections.",
      major: "Management & Organizations",
      year: "Junior",
      hometown: "Atlanta, GA",
      interests: "Leadership Development, Career Coaching, Jewish Professional Networks",
      linkedin: "#",
      email: "member@stern.nyu.edu"
    },
    {
      position: "Director of Community Building and Jewish Diversity",
      name: "Board Member Name",
      bio: "Fostering inclusive Jewish community and celebrating diversity within SJBA.",
      detailedBio: "Dedicated to creating an inclusive environment that celebrates the rich diversity within the Jewish community, this director organizes cultural events, educational programs, and discussions that explore different Jewish traditions and perspectives. Their work ensures that all members feel welcome and valued, regardless of their background or level of Jewish observance, while fostering deeper understanding and appreciation of Jewish heritage.",
      major: "Social Impact & Responsibility",
      year: "Sophomore",
      hometown: "Denver, CO",
      interests: "Cultural Programming, Diversity & Inclusion, Jewish Studies",
      linkedin: "#",
      email: "member@stern.nyu.edu"
    },
    {
      position: "Director of Technology",
      name: "Board Member Name",
      bio: "Leading SJBA's technology initiatives and digital infrastructure.",
      detailedBio: "As the Director of Technology, this forward-thinking leader oversees all of SJBA's digital infrastructure and technology initiatives. They have modernized the organization's systems, improved the member experience through better digital tools, and ensured that SJBA stays at the forefront of technological innovation. Their work has streamlined operations and created new opportunities for virtual engagement and community building.",
      major: "Business Analytics & Technology",
      year: "Junior",
      hometown: "Seattle, WA",
      interests: "Software Development, Digital Innovation, Tech Entrepreneurship",
      linkedin: "#",
      email: "member@stern.nyu.edu"
    }
  ];

  const openModal = (member: BoardMember) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <>
      <div className="page-container">
        <div className="board-header">
          <h1 className="board-title">Our Board</h1>
          <p className="board-subtitle">
            Meet the dedicated leaders driving SJBA's mission to build Jewish community 
            and develop future business leaders at NYU Stern.
          </p>
        </div>

        <div className="board-section">
          <div className="board-grid">
            {boardMembers.map((member, index) => (
              <div 
                key={index} 
                className="board-member-card"
                onClick={() => openModal(member)}
              >
                <div className="member-photo">
                  <div className="photo-placeholder">
                    <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <h4 className="member-position">{member.position}</h4>
                  <p className="member-details">{member.major} • {member.year}</p>
                  <p className="member-bio">{member.bio}</p>
                  <div className="click-hint">Click to learn more</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="join-board-section">
          <div className="join-board-content">
            <h2>Interested in Joining Our Board?</h2>
            <p>
              SJBA is always looking for passionate students who want to make a difference 
              in the Jewish community at NYU Stern. Board positions become available each 
              academic year through our application process.
            </p>
            <div className="join-board-buttons">
              <a href="/contact" className="join-board-btn primary">
                Get Involved
              </a>
              <a href="/events" className="join-board-btn secondary">
                Attend Our Events
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedMember && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-header">
              <div className="modal-photo">
                <div className="photo-placeholder large">
                  <span>{selectedMember.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
              </div>
              <div className="modal-title-section">
                <h2 className="modal-name">{selectedMember.name}</h2>
                <h3 className="modal-position">{selectedMember.position}</h3>
                <p className="modal-details">{selectedMember.major} • {selectedMember.year}</p>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <h4>About</h4>
                <p>{selectedMember.detailedBio}</p>
              </div>
              <div className="modal-info-grid">
                <div className="modal-section">
                  <h4>Hometown</h4>
                  <p>{selectedMember.hometown}</p>
                </div>
                <div className="modal-section">
                  <h4>Interests</h4>
                  <p>{selectedMember.interests}</p>
                </div>
              </div>
              <div className="modal-actions">
                <a href={selectedMember.linkedin} className="modal-btn linkedin" target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </a>
                <a href={`mailto:${selectedMember.email}`} className="modal-btn email">
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default OurBoard; 