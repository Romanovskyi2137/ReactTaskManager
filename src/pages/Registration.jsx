import React, {useState} from "react";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import AuthServise from "../service/authService";
import { useNavigate } from "react-router-dom";
import authValidator from "../validation/authValidator";
import { Notify } from "notiflix";
import "../css/Registration.css"



function Registration () {
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
                <form
                    onSubmit={onFormSubmit}
                    className="registrationPage__form"
                >
                    <h2>Створити обліковий запис</h2>
                    <Input type="text" name="username" placeholder="Ім'я користувача"/>
                    <Input type="text" name="password" placeholder="Пароль"/>
                    <Button type="submit">Зареєструватись</Button>
                </form> 
            </div>
            </div>
        </div>
    )
};

export default Registration

