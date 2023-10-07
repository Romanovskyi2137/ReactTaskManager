import React from "react";
import { getAuth, signInWithPopup } from "firebase/auth";
import { app, googleAuthProvider } from '../../../firebase';

function GoogleLogin ({callback}) {
    const onClick = async () => {
        const auth = getAuth(app);
        try {
            const data = await signInWithPopup(auth, googleAuthProvider);
            const userData = {
                username: data.user.email,
                password: data.user.uid
            };
            const result = await callback(userData)
        } catch (error) {
            // handling error
            console.log(error)
        }
    };
    
    const style = {
        border: "1px solid black"
    }
    return (
        <div className="Google_Auth_Btn" style={style} onClick={onClick}>
            <img src="#" alt="icon"/>
            <h3>Signin with Google!</h3>
        </div>
    )
};

export default GoogleLogin