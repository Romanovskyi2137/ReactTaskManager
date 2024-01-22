import React from "react";

export default function CreateTaskButton ({className, title, ...props}) {
    

    return (
        <button 
            className={className}
            {...props}
        >
            <h3>{title}</h3>
        </button>
    )
}