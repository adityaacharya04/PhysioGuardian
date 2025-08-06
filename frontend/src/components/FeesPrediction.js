import React, { useState } from 'react';

const FeesPrediction = () => {
  const [injuryType, setInjuryType] = useState('back');
  const [location, setLocation] = useState('urban');
  const [rating, setRating] = useState(4.5);
  const [experience, setExperience] = useState(5);
  const [predictedFee, setPredictedFee] = useState(null);

  const getPredictedFee = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/predict-fees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        injury_type: injuryType,
        location,
        rating: parseFloat(rating),
        experience: parseInt(experience),
      }),
    });
    const data = await response.json();
    setPredictedFee(data.predicted_fee);
  };

  return (
    <div>
      <h2>Predict Physiotherapy Fees</h2>
      <form onSubmit={getPredictedFee}>
        <label>
          Injury Type:
          <select value={injuryType} onChange={(e) => setInjuryType(e.target.value)}>
            <option value="back">Back</option>
            <option value="knee">Knee</option>
            <option value="shoulder">Shoulder</option>
          </select>
        </label>
        <label>
          Location:
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="urban">Urban</option>
            <option value="rural">Rural</option>
          </select>
        </label>
        <label>
          Practitioner Rating:
          <input type="number" step="0.1" value={rating} onChange={(e) => setRating(e.target.value)} />
        </label>
        <label>
          Practitioner Experience (years):
          <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} />
        </label>
        <button type="submit">Predict Fees</button>
      </form>
      {predictedFee && (
        <div>
          <h3>Predicted Fee: ${predictedFee.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default FeesPrediction;
