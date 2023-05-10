import React from "react";
import cl from './TextArea.module.css';

const TextArea = (props) => {
    
    
    return (
        <textarea className={cl.TextArea} {...props}></textarea>
    )
}

export default TextArea