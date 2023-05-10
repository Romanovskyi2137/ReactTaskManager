import React from "react";
import cl from './Button.module.css';



function Button ({children, ...props}) {
    

    return (
        <button className={cl.Button} {...props}>
            {children}
        </button>
    )
}


export default Button