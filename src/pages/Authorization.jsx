import React from "react";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import AuthServise from "../service/authService";
import { useNavigate } from "react-router-dom";



function Authorization () {
    const navigate = useNavigate();

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const user = await AuthServise.login(form.username.value, form.password.value);
        // if (user.status !== 200) {
        //     console.log(user)
        // }
        localStorage.setItem("token", JSON.stringify(`Bearer ${user.data.token}`));
        form.username.value = "";
        form.password.value = "";
        navigate("/task_space")
    };
    return (
        <div className="Auth_wrapper">
            <form className="Auth_form" onSubmit={onFormSubmit}>
                <h2 style={{textAlign: "center", marginBottom: "25px"}}>Авторизуйтесь будь-ласка.</h2>
                <Input type="text" name="username" placeholder="Ім'я користувача"/>
                <Input type="text" name="password" placeholder="Пароль"/>
                <Button type="submit">Увійти</Button>
            </form>
        </div>
    )
};

export default Authorization