import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ShowReelList from './components/ShowReelList';
import CreateShowReel from './components/ShowReelForm';
import VideoClipForm from './components/VideoClipForm';
import VideoClipList from './components/VideoClipList';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1 className="py-4 text-center">Reel Application</h1>
        <div className="row">
          <div className="col-md-3">
            <nav className="bg-light p-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/show_reels">Show All Reels</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/create_reel">Create Reel</NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md-9">
            <div className="p-4">
              <Routes>
                <Route path="/show_reels" element={<ShowReelList />} />
                <Route path="/create_reel" element={<CreateShowReel />} />
                <Route path="/create_clip/:showReelId" element={<VideoClipForm />} />
                <Route path="/show_clips" element={<VideoClipList />} />
                <Route path="/" element={<ShowReelList />} index />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
