import React, { useState } from "react";
import "./InputPassword.css"


export default function InputPassword ({placeholder, name, type, setType}) {
    const onIconClick = () => {
        if (type === "password") {
            setType("text")
        } else {
            setType("password")
        }
    }

    return (
        <div className="input__password_continer">
            <input type={type} placeholder={placeholder} name={name}/>
            <img src="" alt="icon" onClick={onIconClick}/>
        </div>
    )
}