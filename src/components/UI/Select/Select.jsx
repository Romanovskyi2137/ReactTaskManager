import React from "react";
import cl from './Select.module.css';

function Select ({options, defaultValue, onChange, value}) {
    return (
        <select
        className={cl.Select}
        value={value}
        onChange={e => onChange(e.target.value)}
        >
            <option value="" disabled>{defaultValue}</option>

            {options.map(option => {
                return <option value={option.value} key={option.value}>{option.name}</option>
            })}
        </select>
    )
}

export default Select