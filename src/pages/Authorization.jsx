import React from "react";



function Authorization () {
    return (
        <form>
            name: <input type="text" name="username"/>
            password: <input type="text" name="userpass"/>
            <button type="submit">go</button>
        </form>
    )
};

export default Authorization