import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import 'tailwindcss/tailwind.css'; // Import your Tailwind CSS file

const CountdownButton = () => {
  const [creationTime, setCreationTime] = useState(new Date());
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  function calculateRemainingTime() {
    const endTime = new Date(creationTime);
    // endTime.setDate(endTime.getDate() + 3);
    endTime.setMinutes(endTime.getMinutes() + 1);
    const timeDiff = endTime - new Date();
    return timeDiff > 0 ? timeDiff : 0;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const timeDiff = calculateRemainingTime();
      setRemainingTime(timeDiff > 0 ? timeDiff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [creationTime]);

  const disableButton = remainingTime === 0;

  return (
    <button
      className={`${
        disableButton ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
      } text-white font-bold py-2 px-4 rounded`}
      disabled={disableButton}
    >
      {disableButton ? 'Disabled' : formatDistanceToNow(creationTime, { addSuffix: true })}
    </button>
  );
};

export default CountdownButton;
