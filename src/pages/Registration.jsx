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
        iconClassName: "_iconsUI__eye-regular"
    });
    const navigate = useNavigate();
    const onFormSubmit = async (e) => {
        try {
            e.preventDefault();
            const form = e.target;
            const validStatus = authValidator(form.username.value, form.password.value);
            const user = await AuthServise.registration(form.username.value, form.password.value)
            form.username.value = "";
            form.password.value = "";
            if (user.status == 200) {
                navigate("/auth", {replace: true})
            }
        } catch (e) {
            Notify.failure(e.message);
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
                            <input type="text" name="login" placeholder="Ім’я"/>
                            <input type="email" name="email" placeholder="Електронна пошта"/>
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
                                <GoogleLogin/>
                            </div>
                            <div className="registration__form_footer">
                                <p>Маєте обліковий запис?</p>
                                <Link to="/auth">Увійти</Link>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Registration

