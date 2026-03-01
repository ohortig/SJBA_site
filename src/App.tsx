import { MotionConfig } from 'motion/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header, ScrollToTop } from '@components';
import { Home, OurMission, OurBoard, OurMembers, Programs, Events, Contact } from './pages';
import { MOTION_TRANSITION_STANDARD } from './motion/tokens';
import './App.css';

function App() {
  return (
    <MotionConfig reducedMotion="user" transition={MOTION_TRANSITION_STANDARD}>
      <Router>
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontWeight: 500,
            },
            success: {
              style: {
                background: '#10b981',
                color: '#fff',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#10b981',
              },
            },
            error: {
              style: {
                background: '#dc2626',
                color: '#fff',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#dc2626',
              },
            },
          }}
        />
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/our-mission" element={<OurMission />} />
              <Route path="/our-board" element={<OurBoard />} />
              <Route path="/our-members" element={<OurMembers />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </Router>
    </MotionConfig>
  );
}

export default App;
