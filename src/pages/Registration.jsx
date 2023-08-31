import React, {useState} from "react";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import AuthServise from "../service/authService";
import { useNavigate } from "react-router-dom";
import authValidator from "../validation/authValidator";
import { Notify } from "notiflix";



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
        <div className="reg_form_wrapper">
                <form onSubmit={onFormSubmit}>
                    <h2 style={{textAlign: "center", marginBottom: "25px"}}>Реєстрація</h2>
                    <Input type="text" name="username" placeholder="Ім'я користувача"/>
                    <Input type="text" name="password" placeholder="Пароль"/>
                    <h6 style={{paddingLeft: "5px"}}>Пароль має бути від 6 до 12 символів</h6>

                    {/* {error && <Error message={error}/>} */}
                    <Button type="submit" style={{marginTop: "5px"}}>Зареєструватись</Button>
                </form> 
        </div>
    )
};

export default Registration

