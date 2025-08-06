import React, { useState } from 'react';

const videos = [
  { id: 1, title: 'Jumping Jacks Tutorial', category: 'Cardio', url: 'https://www.youtube.com/watch?v=c4DAnQ6DtF8' },
  { id: 2, title: 'Squats Tutorial', category: 'Strength', url: 'https://www.youtube.com/watch?v=aclHkV_2HeA' },
  { id: 3, title: 'Push-ups Tutorial', category: 'Strength', url: 'https://www.youtube.com/watch?v=Pkj8R1jknNo' },
  { id: 4, title: 'Yoga for Beginners', category: 'Flexibility', url: 'https://www.youtube.com/watch?v=v7AYKMP6rOE' },
];

const VideoTutorials = () => {
  const [filter, setFilter] = useState('All');
  const [bookmarked, setBookmarked] = useState([]);

  const toggleBookmark = (id) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter((b) => b !== id));
    } else {
      setBookmarked([...bookmarked, id]);
    }
  };

  const filteredVideos = filter === 'All' ? videos : videos.filter((video) => video.category === filter);

  return (
    <div>
      <h2>Exercise Video Tutorials</h2>
      <div>
        Filter by category:
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
          <option value="Flexibility">Flexibility</option>
        </select>
      </div>
      <div>
        {filteredVideos.map((video) => (
          <div key={video.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <h3>{video.title}</h3>
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              Watch Video
            </a>
            <button onClick={() => toggleBookmark(video.id)}>
              {bookmarked.includes(video.id) ? 'Bookmarked' : 'Bookmark'}
            </button>
          </div>
        ))}
      </div>
      <div>
        <h3>Bookmarked Videos</h3>
        {videos
          .filter((video) => bookmarked.includes(video.id))
          .map((video) => (
            <div key={video.id}>{video.title}</div>
          ))}
      </div>
    </div>
  );
};

export default VideoTutorials;
