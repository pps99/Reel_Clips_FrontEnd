import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoClipList = ({ showReel, clips }) => {
  const [updatedClips, setUpdatedClips] = useState(clips);

  useEffect(() => {
    // Update the 'updatedClips' state whenever 'clips' prop changes
    setUpdatedClips(clips);
  }, [clips]);

  const handleRemoveClip = async (clipId) => {
    try {
      await axios.delete(`/show_reels/${showReel.id}/clips/${clipId}`);
      // Remove the clip from the 'clips' array passed as props
      const newClips = updatedClips.filter(updatedClip => updatedClip.id !== clipId);
      setUpdatedClips(newClips); // Update the state with the new clips array
    } catch (error) {
      console.error('Error removing video clip:', error);
    }
  };

  return (
    <div>
      {updatedClips.length > 0 && (
        <div>
          <h3>{showReel.name} - Video Clips</h3>
          <ul>
            {updatedClips.map((clip) => (
              <li key={clip.id}>
                {clip.name} ({clip.start_timecode} - {clip.end_timecode})
                <button onClick={() => handleRemoveClip(clip.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VideoClipList;
