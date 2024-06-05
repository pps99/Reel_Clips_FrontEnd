import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ShowReelForm = ({  }) => {
  const [name, setName] = useState('');
  const [videoStandard, setVideoStandard] = useState('PAL');
  const [videoDefinition, setVideoDefinition] = useState('SD');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/show_reels', {
        show_reel: {
          name,
          video_standard: videoStandard,
          video_definition: videoDefinition,
        },
      });
      setName('');
      setVideoStandard('PAL');
      setVideoDefinition('SD');
      navigate('/show_reels'); // Navigate to the show reels list after successful creation
    } catch (error) {
      console.error('Error creating show reel:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Show Reel Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="videoStandard" className="form-label">Video Standard</label>
              <select
                id="videoStandard"
                className="form-select"
                value={videoStandard}
                onChange={(e) => setVideoStandard(e.target.value)}
              >
                <option value="PAL">PAL</option>
                <option value="NTSC">NTSC</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="videoDefinition" className="form-label">Video Definition</label>
              <select
                id="videoDefinition"
                className="form-select"
                value={videoDefinition}
                onChange={(e) => setVideoDefinition(e.target.value)}
              >
                <option value="SD">SD</option>
                <option value="HD">HD</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Show Reel'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShowReelForm;
