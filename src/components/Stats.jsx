
import React from 'react';

const Stats = ({ wpm, accuracy }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Your Results</h2>
      <p>WPM: <strong>{wpm}</strong></p>
      <p>Accuracy: <strong>{accuracy}%</strong></p>
    </div>
  );
};

export default Stats;
