import React from "react";
import "./InputPassword.css";
import "../../../iconsFont/iconsUI/style.css"


export default function InputPassword ({placeholder, name, visability, setVisability}) {
    const onIconClick = () => {
        if (visability.type === "password") {
            setVisability({
                type: "text",
                iconClassName: "_iconsUI__eye-slash-solid"
            })
        } else {
            setVisability({
                type: "password",
                iconClassName: "_iconsUI__eye-regular"
            })
        }
    }

    return (
        <div className="input__password_continer">
            <input
                type={visability.type}
                placeholder={placeholder}
                name={name}
                // onInput={setVisability({...visability, iconClassName: visability.iconClassName + " input_active"})}
                // absolutely crash my app, wtf???
            />
            <div className={visability.iconClassName} onClick={onIconClick}> </div>
        </div>
    )
}