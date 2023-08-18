import React, {useState} from "react";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import AuthServise from "../service/authService";
import { useNavigate } from "react-router-dom";
import authValidator from "../validation/authValidator";
import Error from "../components/UI/Error/Error";


function Registration () {
    const navigate = useNavigate();
    const [error, setError] = useState("");
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
            setError(e.message)
        }
    }


    return (
        <div className="reg_form_wrapper">
                <form onSubmit={onFormSubmit}>
                    <h2 style={{textAlign: "center", marginBottom: "25px"}}>Реєстрація</h2>
                    <Input type="text" name="username" placeholder="Ім'я користувача"/>
                    <Input type="text" name="password" placeholder="Пароль"/>
                    {error && <Error message={error}/>}
                    <Button type="submit" style={{marginTop: "5px"}}>Зареєструватись</Button>
                </form> 
        </div>
    )
};

export default Registration
