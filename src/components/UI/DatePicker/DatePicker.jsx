import React from "react";



function DatePicker ({onChange}) {
    const getTimeValue = (value) => {
        return new Date(value).getTime()
    };
    return (
        <div>
            <input type="date" onChange={e => onChange(getTimeValue(e.target.value))} />
        </div>
    )
};


export default DatePicker