import cl from "../TimePicker/Timepicker.css";
import { useEffect, useState } from "react";

export default function TimePicker ({getTime}) {
    const [time, setTime] = useState({
        hours: "00",
        minutes: "00"
    });

    useEffect(() => {
        translateToMillis(getTime)
    }, [time])

    const timeCorrector = (value) => {
        if (value < 10) {
            return "0" + value
        };
        return value
    };

    function translateToMillis (callback) {
        const {hours, minutes} = time;
        const millis = (Number(hours) * (1000 * 60 * 60)) + (Number(minutes) * 1000 * 60);
        callback(millis)
    };

    return (
        <div className={cl.TimePicker_Wrapper}>
            <span>Час</span>:
            <input 
                type="number" 
                inputmode="numeric"
                max="23" min="0" 
                value={time.hours} 
                onChange={e => setTime({...time, hours: timeCorrector(e.target.value)})}
            />
            <input 
                type="number" 
                inputMode="numeric"
                max="59" 
                min="0"
                value={time.minutes} 
                onChange={e => setTime({...time, minutes: timeCorrector(e.target.value)})}
            />
        </div>
    )
}