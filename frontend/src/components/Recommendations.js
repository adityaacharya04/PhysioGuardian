import React, { useState } from 'react';

const Recommendations = () => {
  const [age, setAge] = useState('');
  const [injury, setInjury] = useState('none');
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ age: parseInt(age), injury }),
    });
    const data = await response.json();
    setRecommendations(data);
  };

  return (
    <div>
      <h2>Get Exercise Recommendations</h2>
      <form onSubmit={getRecommendations}>
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <label>
          Injury:
          <select value={injury} onChange={(e) => setInjury(e.target.value)}>
            <option value="none">None</option>
            <option value="knee">Knee</option>
            <option value="back">Back</option>
            <option value="shoulder">Shoulder</option>
          </select>
        </label>
        <button type="submit">Get Recommendations</button>
      </form>
      {recommendations.length > 0 && (
        <div>
          <h3>Recommended Exercises:</h3>
          <ul>
            {recommendations.map((exercise, index) => (
              <li key={index}>{exercise}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
