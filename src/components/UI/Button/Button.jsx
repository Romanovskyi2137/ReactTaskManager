import React from "react";
import cl from './Button.module.css';



function Button ({children, ...props}) {
    

    return (
        <button className={cl.Button} {...props}>
            <h3>{children}</h3>
        </button>
    )
}


export default Button