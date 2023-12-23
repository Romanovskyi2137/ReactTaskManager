import React, { useState, useEffect } from "react";

const TaskTimer = ({endPoint}) => {
  const millis = new Date(endPoint).getTime();
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);



  function calculateTimeRemaining() {
    const now = Date.now();
    const timeDiff = millis - now;  
    if (timeDiff <= 0) {
      return { days: 0, hours: 0, minutes: 0, expired: true };
    };

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

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