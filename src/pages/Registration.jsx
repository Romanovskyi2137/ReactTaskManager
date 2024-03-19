import React, {useState} from "react";
import AuthServise from "../service/authService";
import { Link, useNavigate } from "react-router-dom";
import authValidator from "../validation/authValidator";
import { Notify } from "notiflix";
import "../css/Registration.css";
import GoogleLogin from "../components/UI/GoogleLogin/GoogleLogin"
import InputPassword from "../components/UI/InputPassword/InputPassword";



function Registration () {
    const [visability, setVisability] = useState({
        type: "password",
        iconClassName: "_icon-eye_regular"
    });
    const navigate = useNavigate();
    const onFormSubmit = async (e) => {
        try {
            e.preventDefault();
            const form = e.target;
            if (form.password.value !== form.confirm_password.value) {
                throw new Error ("Введіть однакові паролі!")
            };
            const validStatus = authValidator(form.username.value, form.password.value);
            const user = await AuthServise.registration(form.username.value, form.password.value)
            form.username.value = "";
            form.password.value = "";
            if (user.status == 200) {
                navigate("/login", {replace: true})
            }
        } catch (e) {
            Notify.failure(e.message || e);
        }
    }
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
        <div className="registrationPage__wrapper">
            <div className="registrationPage__container">
                <div className="registrationPage__logo_container">
                    <h2 className="registrationPage__logo">React task manager</h2>
                </div>
                <div className="registrationPage__form_container">
                    <div className="registration__form_box">
                        <h2>Створити обліковий запис</h2>
                        <form
                            onSubmit={onFormSubmit}
                            className="registrationPage__form"
                        >
                            <input type="text" name="username" placeholder="Ім’я"/>
                            <input type="email" name="email" placeholder="Ел. пошта (не обов'язково)"/>
                            <InputPassword
                                placeholder={"Пароль"}
                                name={"password"}
                                visability={visability}
                                setVisability={setVisability}
                            />
                            <InputPassword
                                placeholder={"Підтвердити пароль"}
                                name={"confirm_password"}
                                visability={visability}
                                setVisability={setVisability}
                            />
                            <div 
                                className="registration__button_container"
                            >
                                <button
                                    className="registration__button"
                                    type="submit"
                                >
                                    Зареєструватися
                                </button>
                                <GoogleLogin
                                    onGoogleLogin={onGoogleAuthClick}
                                />
                            </div>
                            <div className="registration__form_footer">
                                <p>Маєте обліковий запис?</p>
                                <Link to="/login">Увійти</Link>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Registration

