import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, ScrollToTop } from '@components';
import Home from './pages/Home';
import About from './pages/About';
import OurMission from './pages/OurMission';
import OurBoard from './pages/OurBoard';
import Programs from './pages/Programs';
import Events from './pages/Events';
import Contact from './pages/Contact';
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
            <Route path="/about" element={<About />} />
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
