import React from "react";
import BackToMenu from "../BackToMenu/BackToMenu";
import TaskFilter from "../TaskFilter";
import { Button } from "@mui/material";


export default function PageHeader () {


    return (
        <div>
            <BackToMenu
                location="Всі"
            />
            <div className="pageHeader__interactive">
                <div className='pageHeader__btns'>
                    <Button
                        onClick={completeModalOpen}
                    >
                        Виконані задачі
                    </Button>
                    <Button
                        onClick={createModalOpen}
                    >
                        Створити задачу
                    </Button>
                </div>
            
                <TaskFilter
                    filter={filter}
                    setFilter={setFilter}
                />
            </div>
        </div>
    )
}