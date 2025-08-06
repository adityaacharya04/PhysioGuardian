import React, { useEffect, useRef } from 'react';

const ProgressTracker = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Posture Score',
            data: [65, 70, 75, 80],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    });
  }, []);

  return (
    <div>
      <h2>Progress Tracker</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ProgressTracker;
