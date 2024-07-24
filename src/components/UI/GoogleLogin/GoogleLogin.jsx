import React, { useEffect } from "react";
import { getAuth, signInWithRedirect, getRedirectResult, signInWithPopup } from "firebase/auth";
import { app, googleAuthProvider } from '../../../firebase';
import "./GoogleLogin.css";
import googleIcon from "./googleIcon.png";

function GoogleLogin ({ onGoogleLogin }) {
    const auth = getAuth(app);
    // useEffect(() => {
    //     const handleRedirect = async () => {
    //         try {
    //             const data = await getRedirectResult(auth);
    //             console.log(data); // why it`s null?
    //             if (data) {
    //                 const userData = {
    //                     username: data.user.email,
    //                     password: data.user.uid
    //                 };
    //                 await onGoogleLogin(userData);
    //             };
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     handleRedirect();
    // }, []);

    const handleGoogleLogin = async () => {
        const data = await signInWithPopup(auth, googleAuthProvider);
        if (data) {
            const userData = {
                username: data.user.email,
                password: data.user.uid
            };
            await onGoogleLogin(userData);
        };
    };
    
    return (
        <div className="Google_Auth_Btn" onClick={handleGoogleLogin}>
            <img src={googleIcon} alt="icon"/>
            <h3>Увійти через Google</h3>
        </div>
    );
}

export default GoogleLogin;