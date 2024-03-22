import React from "react";
import { getAuth, signInWithPopup } from "firebase/auth";
import { app, googleAuthProvider } from '../../../firebase';
import "./GoogleLogin.css";
import googleIcon from "./googleIcon.png"

function GoogleLogin ({onGoogleLogin}) {
    const onClick = async () => {
        const auth = getAuth(app);
        try {
            const data = await signInWithPopup(auth, googleAuthProvider);
            const userData = {
                username: data.user.email,
                password: data.user.uid
            };
            const result = await onGoogleLogin(userData)
        } catch (error) {
            // handling error
            console.log(error)
        }
    };
    
    return (
        <div className="Google_Auth_Btn" onClick={onClick}>
            <img src={googleIcon} alt="icon"/>
            <h3>Увійти через Google</h3>
        </div>
    )
};

export default GoogleLogin