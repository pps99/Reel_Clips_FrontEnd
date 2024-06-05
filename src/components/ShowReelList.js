import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShowReelList = () => {
  const [showReels, setShowReels] = useState([]);
  const [expandedReelId, setExpandedReelId] = useState(null);
  const [associatedClips, setAssociatedClips] = useState([]);

  useEffect(() => {
    fetchShowReels();
  }, []);

  const fetchShowReels = async () => {
    try {
      const response = await axios.get('/show_reels');
      setShowReels(response.data);
    } catch (error) {
      console.error('Error fetching show reels:', error);
    }
  };

  const fetchAssociatedClips = async (showReelId) => {
    try {
      const response = await axios.get(`/show_reels/${showReelId}/clips`);
      setAssociatedClips(response.data);
    } catch (error) {
      console.error('Error fetching associated clips:', error);
    }
  };

  const handleSelectShowReel = (showReel) => {
    if (expandedReelId === showReel.id) {
      setExpandedReelId(null);
      setAssociatedClips([]);
    } else {
      setExpandedReelId(showReel.id);
      fetchAssociatedClips(showReel.id);
    }
  };

  const handleRemoveClip = async (showReelId, clipId) => {
    try {
      await axios.delete(`/show_reels/${showReelId}/clips/${clipId}`);
      fetchAssociatedClips(showReelId); // Re-fetch the associated clips after removal
      fetchShowReels(); // Re-fetch the show reels to update the total duration
    } catch (error) {
      console.error('Error removing video clip:', error);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Show Reels</h2>
      {showReels.length === 0 ? (
        <p>No show reels available</p>
      ) : (
        <div className="list-group mb-4">
          {showReels.map((showReel) => (
            <div key={showReel.id} className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-0">{showReel.name}</p>
                  <small>Total Duration: {showReel.total_duration}</small>
                </div>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => handleSelectShowReel(showReel)}
                >
                  {expandedReelId === showReel.id ? 'Hide Clips' : 'Show Clips'}
                </button>
              </div>
              {expandedReelId === showReel.id && (
                <div className="collapse show">
                  <ul className="list-group list-group-flush">
                    {associatedClips.length === 0 ? (
                      <li className="list-group-item">No clips available</li>
                    ) : (
                      associatedClips.map((clip) => (
                        <li key={clip.id} className="list-group-item d-flex justify-content-between align-items-center">
                          {clip.name}
                          <button
                            className="btn btn-danger btn-sm"
                            type="button"
                            onClick={() => handleRemoveClip(showReel.id, clip.id)}
                          >
                            Remove
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                  <div className="card-footer">
                    <Link to={`/create_clip/${showReel.id}`} className="btn btn-primary">
                      Create Clip
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowReelList;
