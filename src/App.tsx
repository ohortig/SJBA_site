import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, ScrollToTop } from '@components';
import {
  Home,
  OurMission,
  OurBoard,
  Programs,
  Events,
  Contact,
} from './pages';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/our-mission" element={<OurMission />} />
            <Route path="/our-board" element={<OurBoard />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
