import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const VideoClipForm = () => {
  const { showReelId } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startTimecode, setStartTimecode] = useState('');
  const [endTimecode, setEndTimecode] = useState('');
  const [videoStandard, setVideoStandard] = useState('PAL');
  const [videoDefinition, setVideoDefinition] = useState('SD');
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`/show_reels/${showReelId}/clips`, {
        clip: {
          name,
          description,
          video_standard: videoStandard,
          video_definition: videoDefinition,
          start_timecode: startTimecode,
          end_timecode: endTimecode,
        },
      });
  
      // Handle successful response (e.g., redirect, confirmation message)
      navigate('/show_reels');
      console.log('Clip submitted successfully!'); // Optional success logging
  
    } catch (error) {
        setErrorMessages(['Sorry, You Cannot Add This Clip']); // Provide a generic error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {errorMessages.length > 0 && (
        <div className="error-messages" style={{ color: 'red' }}>
          {/* Map through errorMessages and display them */}
          {errorMessages.map(message => (
            <p key={message}>{message}</p>
          ))}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="clipName" className="form-label">Clip Name</label>
        <input
          type="text"
          id="clipName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="Enter clip name"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="clipDescription" className="form-label">Description</label>
        <input
          type="text"
          id="clipDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          placeholder="Enter description"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="videoStandard" className="form-label">Video Standard</label>
        <select
          id="videoStandard"
          value={videoStandard}
          onChange={(e) => setVideoStandard(e.target.value)}
          className="form-select"
        >
          <option value="PAL">PAL</option>
          <option value="NTSC">NTSC</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="videoDefinition" className="form-label">Video Definition</label>
        <select
          id="videoDefinition"
          value={videoDefinition}
          onChange={(e) => setVideoDefinition(e.target.value)}
          className="form-select"
        >
          <option value="SD">SD</option>
          <option value="HD">HD</option>
        </select>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="startTimecode" className="form-label">Start Timecode</label>
          <input
            type="text"
            id="startTimecode"
            value={startTimecode}
            onChange={(e) => setStartTimecode(e.target.value)}
            className="form-control"
            placeholder="HH:MM:ss:ff"
            required
          />
        </div>
        <div className="col">
          <label htmlFor="endTimecode" className="form-label">End Timecode</label>
          <input
            type="text"
            id="endTimecode"
            value={endTimecode}
            onChange={(e) => setEndTimecode(e.target.value)}
            className="form-control"
            placeholder="HH:MM:ss:ff"
            required
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Add Clip</button>
    </form>
  );
};

export default VideoClipForm;
