import React from "react";



function DatePicker ({onChange}) {
    const getTimeValue = (value) => {
        return new Date(value).getTime()
    };
    const style = {
        borderRadius: "5px",
        padding: "5px",
        border: "1px solid black"
    }
    return (
        <div>
            <input 
                type="date" 
                style={style} 
                onChange={e => onChange(getTimeValue(e.target.value))}
            />
        </div>
    )
};


export default DatePicker