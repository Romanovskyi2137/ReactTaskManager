import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button/Button";

function StartPage () {
    
    
    return (
        <div className="startpage_wrapper">
            <div className="startpage_container">
                <h1 style={{textAlign: "center", marginBottom: "25px"}}>This is a start page</h1>
                <h3 style={{textAlign: "center", marginBottom: "25px"}}>
                    Запрошуємо вас в інноваційний світ нашого таск менеджера! 
                </h3>
                <p className="start_page_about">
                    Ця платформа призначена для вдосконалення вашої продуктивності та організації повсякденних завдань. 
                <br/>
                    Чи неодноразово ви ставали перед вибором між важливими завданнями та пріоритетами? Тепер з нашим додатком цей вибір стає прозорим та легким завдяки можливості надавати завданням різний рівень важливості.
                    Завдяки нашому інтуїтивно зрозумілому інтерфейсу, ви зможете легко створювати нові задачі, присвоювати їм пріоритети та відстежувати їх виконання. 
                    Це особливо зручно для тих, хто багатозадачний та має багато робочих або особистих завдань, які потребують уваги. 
                <br/>
                    Наша мета - робити вашу робочу та особисту діяльність більш організованою, ефективною та приємною. 
                    Досягайте більшого успіху та гармонії завдяки нашому таск менеджеру. Ваші завдання - наша турбота!
                </p>
                <div className="startpage_interactive__wrapper">
                    <div className="startpage_interactive">
                            <Link to="/task_space">Перейти до задач</Link>
                            <Link to="/registration">Зареєструватись</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default StartPage