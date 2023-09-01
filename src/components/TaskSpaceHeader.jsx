import React from "react";
import Button from "./UI/Button/Button";


function TaskSpaceHeader ({completeModalOpen, createModalOpen}) {


    return (
        <div className="tasks__list_header">
            <h2>React Task Manager</h2>
            <div className='header__btns'>
              <Button
                onClick={completeModalOpen}
              >
                Виконані задачі
              </Button>
              <Button
                style={{marginLeft: "15px"}}
                onClick={createModalOpen}
              >
                Створити задачу
              </Button>
            </div>
        </div>
    )
};


export default TaskSpaceHeader