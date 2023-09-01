import React from "react";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import AuthServise from "../service/authService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Notify } from "notiflix";



function Authorization () {
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || "/";
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
    return (
        <div className="Auth_wrapper">
            <form className="Auth_form" onSubmit={onFormSubmit}>
                <h2 style={{textAlign: "center", marginBottom: "25px"}}>Авторизуйтесь будь-ласка.</h2>
                <Input type="text" name="username" placeholder="Ім'я користувача"/>
                <Input type="password" name="password" placeholder="Пароль"/>
                <Button type="submit">Увійти</Button>
                <div className="authInteractive">
                    <span>Не маєте акаунту? - </span>
                    <Link to="/registration">Зареєструватись</Link>
                </div>
            </form>
        </div>
    )
};

export default Authorization