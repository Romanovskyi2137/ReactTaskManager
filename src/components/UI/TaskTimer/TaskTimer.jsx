import React, { useState, useEffect } from "react";

const TaskTimer = ({endPoint}) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);



  function calculateTimeRemaining() {
    const now = Date.now();
    const timeDiff = (endPoint - now) / 1000;  
    if (timeDiff <= 0) {
      return { days: 0, hours: 0, minutes: 0, expired: true };
    };

    const days = Math.floor(timeDiff / (3600 * 24));
    const hours = Math.floor((timeDiff % (3600 * 24)) / 3600 - 2);
    const minutes = Math.floor((timeDiff % 3600) / 60);

    return { days, hours, minutes, expired: false };
  }


  return (
    <div className="TaskTimer">
      {timeRemaining.expired ? (
        <p>Термін вийшов</p>
      ) : (
        <span>
          Лишилося: {timeRemaining.days > 0 && `${timeRemaining.days} дн.`}{""}
          {timeRemaining.hours > 0 && `${timeRemaining.hours} год.`}{""}
          {timeRemaining.minutes > 0 && `${timeRemaining.minutes} хв.`}
        </span>
      )}
    </div>
  );
};

export default TaskTimer;