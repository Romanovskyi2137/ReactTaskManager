import React, { useState } from "react";
import "../css/Login.css"
import AuthServise from "../service/authService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Notify } from "notiflix";
import GoogleLogin from "../components/UI/GoogleLogin/GoogleLogin";
import InputPassword from "../components/UI/InputPassword/InputPassword";


function Login () {
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || "/";
    const [visability, setVisability] = useState({
        type: "password",
        iconClassName: "_icon-eye_regular"
    })
    const onFormSubmit = async (e) => {
        try {
            e.preventDefault();
            const form = e.target;
            const user = await AuthServise.login(form.username.value, form.password.value);
            localStorage.setItem("token", `Bearer ${user.data.token}`);
            form.username.value = "";
            form.password.value = "";
            navigate(fromPage, {replace: true});
        } catch (e) {
            Notify.failure(e.response.data.message);
        }
    };
    const onGoogleAuthClick = async (data) => {
        try {
            const {username, password} = data;
            const user = await AuthServise.google_login(username, password);
            localStorage.setItem("token", `Bearer ${user.data.token}`);
            navigate("/menu");
        } catch (error) {
            console.log(error)
        }
        
    } 
    return (
        <div className="loginPage__wrapper">
            <div className="loginPage__container">
                <div className="loginPage__logo_container">
                    <h2 className="loginPage__logo">React task manager</h2>
                </div>
                <div className="loginPage__form_container">
                    <div className="login__form_box">
                        <h2>Увійти в обліковий запис</h2>
                        <form
                            onSubmit={onFormSubmit}
                            className="loginPage__form"
                        >
                            <input type="text" name="username" placeholder="Ім’я"/>
                            <InputPassword
                                placeholder={"Пароль"}
                                name={"password"}
                                visability={visability}
                                setVisability={setVisability}
                            />
                            <div 
                                className="login__button_container"
                            >
                                <button
                                    className="login__button"
                                    type="submit"
                                >
                                    Увійти
                                </button>
                                <GoogleLogin
                                    onGoogleLogin={onGoogleAuthClick}
                                />
                            </div>
                            <div className="login__form_footer">
                                <p>Не маєте облікового запису?</p>
                                <Link to="/registration">Зареєструватись</Link>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
        </div>
)
};

export default Login