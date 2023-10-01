import React, { useState, useEffect } from "react";


function TaskTimer ({endPoint}) {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
    useEffect(() => {
        const intervalId = setInterval(updateTimeRemaining, 1000);
    
        return () => {
          clearInterval(intervalId);
        };
      }, []);


    function calculateTimeRemaining () {
        const currentTime = Date.now();
        const remainingTime = Math.max(0, endPoint - currentTime);
        return remainingTime;
    };

    function updateTimeRemaining() {
        setTimeRemaining(calculateTimeRemaining());
      
        if (timeRemaining === 0) {
          return
        }
    };
    function formatTime(milliseconds) {
        const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
        // const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) - 3); 
        // "-3" - added for fixing time issue
        // const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    
        if (days > 0) {
            return `Залишилось ${days} днів`
        } else {
            return "Сьогодні"
        }
    };
    
    return (
        <div>
            <span>
                {formatTime(timeRemaining)}
            </span>
        </div>
    )
}

export default TaskTimer